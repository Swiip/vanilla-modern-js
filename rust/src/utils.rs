use super::DIMENSION;

pub fn get_dimension() -> Vec<usize> {
    vec![0; DIMENSION]
        .iter()
        .enumerate()
        .map(|(i, _)| i)
        .collect()
}

pub fn times<F>(times: usize, mut f: F) where F: FnMut() {
    for _ in 0..times {
        f();
    }
}
