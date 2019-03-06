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
