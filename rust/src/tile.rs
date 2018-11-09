#[derive(Debug, Serialize, Deserialize)]
pub struct Tile {
    pub id: usize,
    pub value: usize,
    pub row: usize,
    pub column: usize,
    pub merged: bool,
    pub merged_tiles: Vec<Tile>
}

impl Tile {
    pub fn new(id: usize) -> Tile {
        Tile {
            id,
            value: 0,
            row: 0,
            column: 0,
            merged: false,
            merged_tiles: vec![]
        }
    }

    pub fn copy(&mut self, other: &Tile) {
        self.id = other.id;
        self.value = other.value;
        self.row = other.row;
        self.column = other.column;
        self.merged = other.merged;
        self.merged_tiles = other.merged_tiles.clone();
    }
}

impl Clone for Tile {
    fn clone(&self) -> Tile {
        Tile {
            id: self.id,
            value: self.value,
            row: self.row,
            column: self.column,
            merged: self.merged,
            merged_tiles: self.merged_tiles.clone()
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        Tile::new(42);
    }
}
