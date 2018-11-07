use super::DIMENSION;

use board::Board;
use tile::Tile;

fn get_dimension() -> Vec<usize> {
    vec![0; DIMENSION]
        .iter()
        .enumerate()
        .map(|(i, _)| i)
        .collect()
}

fn times<F>(times: usize, mut f: F) where F: FnMut() {
    for _ in 0..times {
        f();
    }
}

// 0 -> left, 1 -> up, 2 -> right, 3 -> down
fn move_action(board: &mut Board, direction: usize) -> bool {
    times(direction, || {
        rotate_left(board);
    });
    let changed = move_left(board);
    times(4 - direction, || {
        rotate_left(board);
    });
    changed
}

fn rotate_left(board: &mut Board) {
    let copy = board.grid.clone();

    board.grid
        .iter_mut()
        .enumerate()
        .for_each(|(x, line)| {
            line
                .iter_mut()
                .enumerate()
                .for_each(|(y, tile)| {
                    tile.copy(&copy[y][DIMENSION - x - 1]);
                })
        });
}

fn move_left(board: &mut Board) -> bool {
    let mut current_id = board.current_id;

    let mut get_new_id = || -> usize {
        current_id += 1;
        current_id
    };

    let mut changed = false;

    board.grid
        .iter_mut()
        .for_each(|line| {
            let mut new_line: Vec<Tile>;

            {
                let mut current_row: Vec<&Tile> = line
                    .iter()
                    .filter(|tile| tile.value != 0)
                    .collect();

                current_row.reverse();

                new_line = get_dimension()
                    .iter_mut()
                    .map(|y| {
                        let mut target_tile = match current_row.pop() {
                            Some(tile) => tile.clone(),
                            None => Tile::new(get_new_id()),
                        };
                        if current_row.len() > 0 && current_row[0].value == target_tile.value {
                            let mut tile1 = target_tile.clone();
                            tile1.merged = true;
                            // target_tile = Tile::new(targetTile.value);
                            // target_tile.id = board.current_id + 1;
                            target_tile.id = get_new_id();
                            target_tile.value = tile1.value * 2;
                            // targetTile.mergedTiles = [];
                            target_tile.merged_tiles.push(tile1);
                            let mut tile2 = current_row.pop().unwrap().clone();
                            tile2.merged = true;
                            // const tile2 = { ...currentRow.shift() };
                            // tile2.merged = true;
                            // targetTile.value += tile2.value;
                            // targetTile.mergedTiles.push(tile2);
                            target_tile.merged_tiles.push(tile2);
                        }
                        // let toto = &line[*y];
                        changed |= target_tile.value != line[*y].value;
                        target_tile
                    })
                    .collect();
            }

            line.clear();
            line.append(&mut new_line);
        });

    changed
    // const currentRow = row.filter(tile => tile.value !== 0);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn rotate_left_works() {
        let mut board = Board::new();
        board.grid[1][0].value = 2;

        rotate_left(&mut board);

        assert_eq!(board.grid[3][1].value, 2);
    }

    #[test]
    fn move_left_works() {
        let mut board = Board::new();
        board.grid[1][1].value = 2;
        board.grid[1][2].value = 2;
        board.grid[1][3].value = 2;

        let changed = move_left(&mut board);

        assert_eq!(board.grid[1][0].value, 4);
        assert_eq!(board.grid[1][1].value, 2);
        assert_eq!(changed, true);
    }

    #[test]
    fn move_action_works() {
        let mut board = Board::new();
        board.grid[1][0].value = 2;

        move_action(&mut board, 1);

        assert_eq!(board.grid[0][0].value, 2);
    }
}
