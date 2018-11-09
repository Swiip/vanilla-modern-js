use super::DIMENSION;
use super::FOOR_PROBABILITY;

use tile::Tile;
use utils::get_dimension;
use utils::times;

#[derive(Debug, Serialize, Deserialize)]
pub struct Board {
    pub current_id: usize,
    pub grid: Vec<Vec<Tile>>
}

impl Clone for Board {
    fn clone(&self) -> Board {
        Board {
            current_id: self.current_id,
            grid: self.grid.clone()
        }
    }
}

impl Board {
    pub fn new() -> Board {
        let mut id = 0;
        Board {
            grid: vec![0; DIMENSION]
                .iter()
                .map(|_| vec![0; DIMENSION]
                    .iter()
                    .map(|_| {
                        id += 1;
                        Tile::new(id)
                    }).collect()
                ).collect(),
            current_id: id
        }
    }

    pub fn update_tiles(&mut self) {
        for (row_index, row) in self.grid.iter_mut().enumerate() {
            for (column_index, tile) in row.iter_mut().enumerate() {
                tile.row = row_index;
                tile.column = column_index;
                for merged_tile in tile.merged_tiles.iter_mut() {
                    merged_tile.row = row_index;
                    merged_tile.column = column_index;
                }
            }
        }
    }

    pub fn choose_random_tile(&mut self, random_position: f32, random_value: f32) {
        let mut empty_cells: Vec<&mut Tile> = self.grid
            .iter_mut()
            .flatten()
            .filter(|tile| tile.value == 0)
            .collect();

        let index = (random_position * empty_cells.len() as f32).floor() as usize;
        let value = if random_value < FOOR_PROBABILITY { 4 } else { 2 };

        empty_cells[index].id = self.current_id;
        empty_cells[index].value = value;

        self.current_id += 1;
    }

    // 0 -> left, 1 -> up, 2 -> right, 3 -> down
    pub fn move_action(&mut self, direction: usize) -> bool {
        times(direction, || {
            self.rotate_left();
        });
        let changed = self.move_left();
        times(4 - direction, || {
            self.rotate_left();
        });
        changed
    }

    fn rotate_left(&mut self) {
        let copy = self.grid.clone();

        for (row_index, row) in self.grid.iter_mut().enumerate() {
            for (column_index, tile) in row.iter_mut().enumerate() {
                tile.copy(&copy[column_index][DIMENSION - row_index - 1]);
            }
        }
    }

    fn move_left(&mut self) -> bool {
        let mut current_id = self.current_id;
        let mut changed = false;

        {
            let mut get_new_id = || -> usize {
                current_id += 1;
                current_id
            };

            self.grid
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
                                if current_row.len() > 0 && current_row[current_row.len() - 1].value == target_tile.value {
                                    let mut tile1 = target_tile.clone();
                                    tile1.merged = true;
                                    target_tile.id = get_new_id();
                                    target_tile.value = tile1.value * 2;
                                    target_tile.merged_tiles.push(tile1);
                                    let mut tile2 = current_row.pop().unwrap().clone();
                                    tile2.merged = true;
                                    target_tile.merged_tiles.push(tile2);
                                }
                                changed |= target_tile.value != line[*y].value;
                                target_tile
                            })
                            .collect();
                    }

                    line.clear();
                    line.append(&mut new_line);
                });
        }

        self.current_id = current_id;

        changed
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn board_works() {
        Board::new();
    }

    #[test]
    fn update_tiles_works() {
        let mut board = Board::new();

        board.update_tiles();

        let row = 2;
        let column = 3;
        let tile = &board.grid[row][column];

        assert_eq!(tile.row, row);
        assert_eq!(tile.column, column);
    }

    #[test]
    fn choose_random_tile_works() {
        let mut board = Board::new();

        board.choose_random_tile(0.3, 0.4);

        assert_eq!(board.grid[1][0].value, 2);
    }

    #[test]
    fn rotate_left_works() {
        let mut board = Board::new();
        board.grid[1][0].value = 2;

        board.rotate_left();

        assert_eq!(board.grid[3][1].value, 2);
    }

    #[test]
    fn rotate_left_with_merge_works() {
        let mut board = Board::new();

        board.grid[0][0].merged_tiles.push(Tile::new(42));

        board.rotate_left();

        println!("board {:?}", board);

        assert_eq!(board.grid[3][0].merged_tiles.len(), 1);
        assert_eq!(board.grid[3][0].merged_tiles[0].id, 42);
    }

    #[test]
    fn move_left_works() {
        let mut board = Board::new();
        board.grid[1][1].value = 2;
        board.grid[1][2].value = 2;
        board.grid[1][3].value = 2;

        let changed = board.move_left();

        assert_eq!(board.grid[1][0].value, 4);
        assert_eq!(board.grid[1][1].value, 2);
        assert_eq!(changed, true);
    }

    #[test]
    fn move_action_works() {
        let mut board = Board::new();
        board.grid[1][0].value = 2;

        board.move_action(1);

        assert_eq!(board.grid[0][0].value, 2);
    }

    #[test]
    fn move_action_with_merge_works() {
        let mut board = Board::new();

        board.grid[3][0].value = 4;
        board.grid[3][1].value = 4;
        board.grid[3][2].value = 16;

        board.move_action(0);

        assert_eq!(board.grid[3][0].value, 8);
        assert_eq!(board.grid[3][1].value, 16);
        assert_eq!(board.grid[3][2].value, 0);
    }

    #[test]
    fn move_action_with_merge_check_ids_works() {
        let mut board = Board::new();

        board.grid[3][0].value = 4;
        board.grid[3][1].value = 4;
        board.grid[3][2].value = 16;

        let id_4_1 = board.grid[3][0].id;
        let id_4_2 = board.grid[3][1].id;
        let id_16 = board.grid[3][2].id;
        let current_id = board.current_id;

        board.move_action(0);

        assert_eq!(board.current_id, current_id + 15);
        assert_eq!(board.grid[3][0].id, current_id + 13);
        assert_eq!(board.grid[3][1].id, id_16);
        assert_eq!(board.grid[3][0].merged_tiles.len(), 2);
        assert_eq!(board.grid[3][0].merged_tiles[0].id, id_4_1);
        assert_eq!(board.grid[3][0].merged_tiles[0].merged, true);
        assert_eq!(board.grid[3][0].merged_tiles[1].id, id_4_2);
        assert_eq!(board.grid[3][0].merged_tiles[1].merged, true);
    }

    #[test]
    fn move_action_with_merge_right_works() {
        let mut board = Board::new();

        board.grid[0][0].value = 4;
        board.grid[0][1].value = 4;
        board.grid[0][2].value = 4;
        board.grid[0][3].value = 4;

        board.move_action(2);
        board.update_tiles();

        println!("board {:?}", board);

        assert_eq!(board.grid[0][2].value, 8);
        assert_eq!(board.grid[0][2].merged_tiles.len(), 2);
        assert_eq!(board.grid[0][3].value, 8);
        assert_eq!(board.grid[0][3].merged_tiles.len(), 2);
    }
}
