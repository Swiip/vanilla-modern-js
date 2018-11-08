use state::State;
use action::Action;
use action::ActionType;

pub fn reducer(state: State, action: Action) -> State {
    match action.action_type {
        ActionType::Init => {
            let mut mew_state = State::new();
            mew_state.board.choose_random_tile(action.random_position.unwrap(), action.random_value.unwrap());
            mew_state.board.update_tiles();
            mew_state
        }
        ActionType::Move => {
            let mut mew_state = state.clone();
            mew_state.board.move_action(action.direction.unwrap());
            mew_state.board.choose_random_tile(action.random_position.unwrap(), action.random_value.unwrap());
            mew_state.board.update_tiles();
            mew_state
        }
    }
}
