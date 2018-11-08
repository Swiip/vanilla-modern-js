use board::Board;
use add::choose_random_tile;
use add::update_tiles;
use move_tile::move_action;

#[derive(Debug, Serialize, Deserialize)]
pub struct ReducerArguments {
    pub state: State,
    pub action: Action
}

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

#[derive(Debug, Serialize, Deserialize)]
pub enum ActionType {
    Init,
    Move
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Action {
    pub action_type: ActionType,
    pub direction: Option<usize>,
    pub random_value: Option<f32>,
    pub random_position: Option<f32>,
}

pub fn reducer(state: State, action: Action) -> State {
    match action.action_type {
        ActionType::Init => {
            let mut mew_state = State::new();
            choose_random_tile(&mut mew_state.board, action.random_position.unwrap(), action.random_value.unwrap());
            update_tiles(&mut mew_state.board);
            mew_state
        }
        ActionType::Move => {
            let mut mew_state = state.clone();
            move_action(&mut mew_state.board, action.direction.unwrap());
            choose_random_tile(&mut mew_state.board, action.random_position.unwrap(), action.random_value.unwrap());
            update_tiles(&mut mew_state.board);
            mew_state
        }
    }
}
