use board::Board;

#[derive(Debug, Serialize, Deserialize)]
pub struct State {
    pub board: Board,
    pub changed: bool,
    pub won: bool,
    pub lost: bool,
}

impl State {
    pub fn new() -> State {
        State {
            board: Board::new(),
            changed: false,
            won: false,
            lost: false
        }
    }
}

impl Clone for State {
    fn clone(&self) -> State {
        State {
            board: self.board.clone(),
            changed: self.changed,
            won: self.won,
            lost: self.lost
        }
    }
}
