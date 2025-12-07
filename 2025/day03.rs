use std::{fs, time::Instant};

fn main() {
    let input = fs::read_to_string("./2025/day03.input.txt")
        .expect("Failed to load ./2025/day03.input.txt");

    let time = Instant::now();
    println!("{}", get_joltage_sum(parse(&input), 2));
    println!("p1: {:?}", time.elapsed());

    let time = Instant::now();
    println!("{}", get_joltage_sum(parse(&input), 12));
    println!("p2: {:?}", time.elapsed());
}

fn parse(input: &str) -> Vec<Vec<u8>> {
    input
        .lines()
        .map(|line| {
            line.chars()
                .map(|c| c.to_digit(10).unwrap() as u8)
                .collect()
        })
        .collect()
}

fn get_joltage_sum(banks: Vec<Vec<u8>>, len: usize) -> u64 {
    banks
        .into_iter()
        .map(|bank| get_largest_joltage(bank, len))
        .sum()
}

fn get_largest_joltage(bank: Vec<u8>, len: usize) -> u64 {
    let mut stack: Vec<u8> = Vec::new();

    let drop_count = bank.len() - len;
    let mut dropped = 0;

    for n in bank {
        while let Some(&last) = stack.last()
            && last < n
            && dropped < drop_count
        {
            stack.pop();
            dropped += 1;
        }

        stack.push(n)
    }

    stack[0..len]
        .iter()
        .map(|n| n.to_string())
        .collect::<String>()
        .parse()
        .unwrap()
}

#[cfg(test)]
mod tests {
    #[allow(unused_imports)]
    use super::*;

    const INPUT: &str = "987654321111111
811111111111119
234234234234278
818181911112111";

    #[test]
    fn test() {
        let to_vec = |s: &str| {
            s.chars()
                .map(|c| c.to_digit(10).unwrap() as u8)
                .collect::<Vec<u8>>()
        };

        assert_eq!(get_largest_joltage(to_vec("987654321111111"), 2), 98);
        assert_eq!(get_largest_joltage(to_vec("811111111111119"), 2), 89);
        assert_eq!(get_largest_joltage(to_vec("234234234234278"), 2), 78);
        assert_eq!(get_largest_joltage(to_vec("818181911112111"), 2), 92);

        assert_eq!(get_joltage_sum(parse(INPUT), 2), 357);
        assert_eq!(get_joltage_sum(parse(INPUT), 12), 3121910778619);

        // main();
    }
}
