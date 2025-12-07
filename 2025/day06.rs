use std::{fs, time::Instant};

fn main() {
    let input = fs::read_to_string("./2025/day06.input.txt")
        .expect("Failed to load ./2025/day06.input.txt");

    let time = Instant::now();
    println!("\x1b[33m{}\x1b[0m", part_1(parse_1(&input)));
    println!("p1: {:?}", time.elapsed());

    let time = Instant::now();
    println!("\x1b[33m{}\x1b[0m", part_2(parse_2(&input)));
    println!("p2: {:?}", time.elapsed());
}

#[derive(Debug)]
enum Op {
    Add,
    Mul,
}

fn parse_1(input: &str) -> (Vec<Op>, Vec<Vec<u64>>) {
    let lines = input.lines().collect::<Vec<_>>();

    let ops = lines
        .last()
        .unwrap()
        .split_whitespace()
        .map(|s| match s.chars().next() {
            Some('+') => Op::Add,
            Some('*') => Op::Mul,
            _ => unreachable!(),
        })
        .collect::<Vec<_>>();

    let nums = lines[0..lines.len() - 1]
        .into_iter()
        .map(|line| {
            line.split_whitespace()
                .map(|n| n.parse::<u64>().unwrap())
                .collect::<Vec<_>>()
        })
        .collect::<Vec<_>>();

    (ops, nums)
}

fn part_1((ops, nums): (Vec<Op>, Vec<Vec<u64>>)) -> u64 {
    ops.into_iter()
        .enumerate()
        .filter_map(|(i, op)| {
            let ns = nums.iter().map(|row| row[i]);

            ns.reduce(|a, b| match op {
                Op::Add => a + b,
                Op::Mul => a * b,
            })
        })
        .sum()
}

#[derive(Debug)]
struct Command {
    op: Op,
    nums: Vec<u64>,
}

fn parse_2(input: &str) -> Vec<Command> {
    let lines = input.lines().collect::<Vec<_>>();
    let w = lines[0].len();
    let h = lines.len();

    let mut commands: Vec<Command> = Vec::new();

    for x in 0..w {
        let col = lines
            .iter()
            .map(|&line| line.as_bytes()[x] as char)
            .collect::<String>();

        if col.trim().is_empty() {
            continue;
        }

        let op = match col.as_bytes()[h - 1] {
            b'+' => Some(Op::Add),
            b'*' => Some(Op::Mul),
            _ => None,
        };
        if let Some(op) = op {
            commands.push(Command {
                op,
                nums: Vec::new(),
            });
        }

        let num = col[..h - 1].trim().parse::<u64>().unwrap();

        commands.last_mut().unwrap().nums.push(num);
    }

    commands
}

fn part_2(commands: Vec<Command>) -> u64 {
    commands
        .into_iter()
        .map(|cmd| {
            cmd.nums
                .into_iter()
                .reduce(|a, b| match cmd.op {
                    Op::Add => a + b,
                    Op::Mul => a * b,
                })
                .unwrap()
        })
        .sum()
}

#[cfg(test)]
mod tests {
    #[allow(unused_imports)]
    use super::*;

    #[test]
    fn test() {
        let input: &str = "123 328  51 64 \n 45 64  387 23 \n  6 98  215 314\n*   +   *   +  ";

        assert_eq!(part_1(parse_1(input)), 4277556);
        assert_eq!(part_2(parse_2(input)), 3263827);

        // main();
    }
}
