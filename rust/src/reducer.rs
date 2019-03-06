use state::State;
use action::Action;
use action::ActionType;

pub fn reducer(state: State, action: Action) -> State {
    match action.action_type {
        ActionType::Init => {
            let mut new_state = State::new();
            new_state.board.choose_random_tile(action.random_position.unwrap(), action.random_value.unwrap());
            new_state.board.update_tiles();
            new_state
        }
        ActionType::Move => {
            let mut new_state = state.clone();
            new_state.board.move_action(action.direction.unwrap());
            new_state.board.choose_random_tile(action.random_position.unwrap(), action.random_value.unwrap());
            new_state.board.update_tiles();
            new_state.won = new_state.board.has_won();
            new_state.lost = new_state.board.has_lost();
            new_state
        }
    }
}
