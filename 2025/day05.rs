use std::{fs, time::Instant};

fn main() {
    let input = fs::read_to_string("./2025/day05.input.txt")
        .expect("Failed to load ./2025/day05.input.txt");

    let time = Instant::now();
    println!("\x1b[33m{}\x1b[0m", get_fresh_count(parse(&input)));
    println!("p1: {:?}", time.elapsed());

    let time = Instant::now();
    println!("\x1b[33m{}\x1b[0m", get_all_fresh_count(parse(&input)));
    println!("p2: {:?}", time.elapsed());
}

fn parse(input: &str) -> (Vec<u64>, Vec<(u64, u64)>) {
    enum State {
        Ranges,
        Ids,
    }

    let mut ranges = Vec::new();
    let mut ids = Vec::new();

    let mut state = State::Ranges;

    for line in input.lines() {
        if line.is_empty() {
            state = State::Ids;
            continue;
        }
        match state {
            State::Ranges => {
                let (from, to) = line.split_once("-").unwrap();
                ranges.push((from.parse().unwrap(), to.parse().unwrap()));
            }
            State::Ids => ids.push(line.parse().unwrap()),
        }
    }
    return (ids, ranges);
}

fn get_fresh_count((ids, ranges): (Vec<u64>, Vec<(u64, u64)>)) -> u64 {
    ids.iter()
        .filter(|&id| ranges.iter().any(|(from, to)| id >= from && id <= to))
        .count() as u64
}

fn can_merge(a: &(u64, u64), b: &(u64, u64)) -> bool {
    !((a.0 > b.1 + 1) || (b.0 > a.1 + 1))
}

fn merge(a: &(u64, u64), b: &(u64, u64)) -> (u64, u64) {
    [a.0, a.1, b.0, b.1]
        .into_iter()
        .fold((u64::MAX, u64::MIN), |acc, cur| {
            (acc.0.min(cur), acc.1.max(cur))
        })
}

fn merge_ranges(mut ranges: Vec<(u64, u64)>) -> Vec<(u64, u64)> {
    let mut result = Vec::new();

    'outer: while ranges.len() > 1 {
        let last = ranges.pop().unwrap();

        for (i, range) in ranges.iter().enumerate() {
            if can_merge(&last, &range) {
                let merged = merge(&last, &range);
                ranges.swap_remove(i);
                ranges.push(merged);

                continue 'outer;
            }
        }
        result.push(last);
    }
    result.push(ranges[0]);

    result
}

fn get_all_fresh_count((_, ranges): (Vec<u64>, Vec<(u64, u64)>)) -> u64 {
    merge_ranges(ranges)
        .into_iter()
        .map(|(from, to)| to - from + 1)
        .sum()
}

#[cfg(test)]
mod tests {
    #[allow(unused_imports)]
    use super::*;

    const INPUT: &str = "3-5
10-14
16-20
12-18

1
5
8
11
17
32";

    #[test]
    fn test() {
        assert_eq!(get_fresh_count(parse(INPUT)), 3);
        assert_eq!(get_all_fresh_count(parse(INPUT)), 14);

        // main();
    }
}
