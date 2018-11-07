use super::DIMENSION;

use tile::Tile;

#[derive(Debug, Serialize, Deserialize)]
pub struct Board {
    pub current_id: usize,
    pub grid: Vec<Vec<Tile>>
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

    pub fn get_new_id(&mut self) -> usize {
        self.current_id += 1;
        self.current_id
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let board = Board::new();

        // println!("Board {:?}", board);
    }
}
