use board::Board;

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

impl Action {
    pub fn from_json(data: String) -> Action {
        Action {
            action_type: ActionType::Init,
            direction: None,
            random_value: None,
            random_position: None
        }
    }
}

pub fn reducer(state: State, action: Action) -> State {
    State::new()
}
