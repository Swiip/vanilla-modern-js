use super::FOOR_PROBABILITY;

use board::Board;
use tile::Tile;

fn update_tiles(board: &mut Board) {
    board.grid
        .iter_mut()
        .enumerate()
        .for_each(|(x, line)| {
            line
                .iter_mut()
                .enumerate()
                .for_each(|(y, tile)| {
                    tile.row = x;
                    tile.column = y;
                })
        });

    // println!("update {:?}", board);
}

pub fn choose_random_tile(board: &mut Board, random_position: f32, random_value: f32) {
    // let empty_cells: Vec<(usize, usize, &Tile)> = board.grid
    //     .iter()
    //     .map(|line| line.iter().enumerate().collect::<Vec<(usize, &Tile)>>())
    //     .flatten()
    //     .enumerate()
    //     .map(|(x, (y, tile))| (x, y, tile))
    //     .filter(|(_, _, tile)| tile.value == 0)
    //     .collect();
    {
        let mut empty_cells: Vec<&mut Tile> = board.grid
            .iter_mut()
            .flatten()
            .filter(|tile| tile.value == 0)
            .collect();

        let index = (random_position * empty_cells.len() as f32).floor() as usize;
        let value = if random_value < FOOR_PROBABILITY { 4 } else { 2 };

        empty_cells[index].id = board.current_id;
        empty_cells[index].value = value;

        board.current_id += 1;
    }

    // println!("choose {:?}", board);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn update_tiles_works() {
        let mut board = Board::new();

        update_tiles(&mut board);

        let row = 2;
        let column = 3;
        let tile = &board.grid[row][column];

        assert_eq!(tile.row, row);
        assert_eq!(tile.column, column);
    }

    #[test]
    fn choose_random_tile_works() {
        let mut board = Board::new();

        choose_random_tile(&mut board, 0.3, 0.4);

        assert_eq!(board.grid[1][0].value, 2);
    }
}
