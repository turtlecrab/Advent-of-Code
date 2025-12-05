use std::{fs, time::Instant};

fn main() {
    let input = fs::read_to_string("./2025/day01.input.txt")
        .expect("Failed to load ./2025/day01.input.txt");

    let time = Instant::now();
    println!("{}", get_password(parse_dials(&input)));
    println!("p1: {:?}", time.elapsed());

    let time = Instant::now();
    println!("{}", get_password2(parse_dials(&input)));
    println!("p1: {:?}", time.elapsed());
}

fn parse_dials(input: &str) -> Vec<i32> {
    input
        .lines()
        .map(|line| {
            line[1..].parse::<i32>().unwrap()
                * match line.chars().nth(0).unwrap() {
                    'L' => -1,
                    _ => 1,
                }
        })
        .collect()
}

fn get_zero_crossings(from: i32, to: i32) -> i32 {
    let mut count = 0;

    let dir = if to > from { 1 } else { -1 };

    let mut i = from;
    while i != to {
        if i.rem_euclid(100) == 0 {
            count += 1
        }
        i += dir;
    }

    count
}

fn get_password(dials: Vec<i32>) -> i32 {
    let mut cur = 50;
    let mut password = 0;

    for dial in dials {
        cur = (cur + dial).rem_euclid(100);

        if cur == 0 {
            password += 1
        }
    }
    password
}

fn get_password2(dials: Vec<i32>) -> i32 {
    let mut cur = 50;
    let mut password = 0;

    for dial in dials {
        password += get_zero_crossings(cur, cur + dial);

        cur = (cur + dial).rem_euclid(100);
    }
    password
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        let test_input = "L68\nL30\nR48\nL5\nR60\nL55\nL1\nL99\nR14\nL82";

        assert_eq!(get_password(parse_dials(test_input)), 3);
        assert_eq!(get_password2(parse_dials(test_input)), 6);
    }
}
