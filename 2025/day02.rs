use std::{fs, ops::RangeInclusive, time::Instant};

fn main() {
    let input = fs::read_to_string("./2025/day02.input.txt")
        .expect("Failed to load ./2025/day02.input.txt");

    let time = Instant::now();
    println!("{}", get_invalids_sum(parse(&input), Part::One));
    println!("p1: {:?}", time.elapsed());

    let time = Instant::now();
    println!("{}", get_invalids_sum(parse(&input), Part::Two));
    println!("p2: {:?}", time.elapsed());
}

fn parse(input: &str) -> Vec<RangeInclusive<u64>> {
    input
        .split(',')
        .map(|r| r.trim().split_once('-').unwrap())
        .map(|(from, to)| {
            let from: u64 = from.parse().unwrap();
            let to: u64 = to.parse().unwrap();
            from..=to
        })
        .collect()
}

fn is_invalid_part1(n: &u64) -> bool {
    let s = n.to_string();
    s[0..s.len() / 2] == s[s.len() / 2..]
}

fn is_invalid_part2(n: &u64) -> bool {
    let s = n.to_string();
    let t = format!("{s}{s}");
    t[1..t.len() - 1].contains(&s)
}

enum Part {
    One,
    Two,
}

fn get_invalids_sum(ranges: Vec<RangeInclusive<u64>>, part: Part) -> u64 {
    ranges
        .into_iter()
        .flat_map(|r| {
            r.filter(match part {
                Part::One => is_invalid_part1,
                Part::Two => is_invalid_part2,
            })
        })
        .sum()
}

#[cfg(test)]
mod tests {
    #[allow(unused_imports)]
    use super::*;

    const INPUT: &str = "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
    1698522-1698528,446443-446449,38593856-38593862,565653-565659,
    824824821-824824827,2121212118-2121212124";

    #[test]
    fn test() {
        assert_eq!(
            parse("1188511880-1188511890,2121212118-2121212124"),
            vec![1188511880..=1188511890, 2121212118..=2121212124]
        );

        assert_eq!(get_invalids_sum(parse(INPUT), Part::One), 1227775554);
        assert_eq!(get_invalids_sum(parse(INPUT), Part::Two), 4174379265);

        // main();
    }
}
