use std::{fs, ops::Add, time::Instant};

fn main() {
    let input = fs::read_to_string("./2025/day04.input.txt")
        .expect("Failed to load ./2025/day04.input.txt");

    let time = Instant::now();
    println!("{}", count_accessible_papers(parse(&input)));
    println!("p1: {:?}", time.elapsed());

    let time = Instant::now();
    println!("{}", remove_all_accessible_papers(parse(&input)));
    println!("p2: {:?}", time.elapsed());
}

#[derive(Debug, Clone, Copy, PartialEq)]
enum Tile {
    Empty,
    Paper,
}

impl ToString for Tile {
    fn to_string(&self) -> String {
        match self {
            Tile::Empty => ".".to_string(),
            Tile::Paper => "@".to_string(),
        }
    }
}

type Grid = Vec<Vec<Tile>>;

#[derive(Debug, Clone, Copy)]
struct Vec2 {
    x: i32,
    y: i32,
}

impl Add for Vec2 {
    type Output = Self;
    fn add(self, rhs: Self) -> Self::Output {
        Self {
            x: self.x.add(rhs.x),
            y: self.y.add(rhs.y),
        }
    }
}

impl Add<&Vec2> for &Vec2 {
    type Output = Vec2;
    fn add(self, rhs: &Vec2) -> Self::Output {
        (*self).add(*rhs)
    }
}

const SIDES: [Vec2; 8] = [
    Vec2 { x: 1, y: 0 },
    Vec2 { x: -1, y: 0 },
    Vec2 { x: 0, y: 1 },
    Vec2 { x: 0, y: -1 },
    Vec2 { x: 1, y: 1 },
    Vec2 { x: -1, y: 1 },
    Vec2 { x: -1, y: -1 },
    Vec2 { x: 1, y: -1 },
];

fn parse(input: &str) -> Grid {
    input
        .lines()
        .map(|line| {
            line.chars()
                .map(|c| match c {
                    '@' => Tile::Paper,
                    '.' => Tile::Empty,
                    _ => unreachable!(),
                })
                .collect()
        })
        .collect()
}

fn tile_at(pos: &Vec2, grid: &Grid) -> Option<Tile> {
    grid.get(pos.y as usize)?.get(pos.x as usize).cloned()
}

fn is_paper_at(pos: &Vec2, grid: &Grid) -> bool {
    tile_at(pos, grid).is_some_and(|tile| tile == Tile::Paper)
}

fn count_neighbor_papers(pos: &Vec2, grid: &Grid) -> usize {
    SIDES
        .iter()
        .filter(|side| is_paper_at(&(pos + side), grid))
        .count()
}

fn count_accessible_papers(grid: Grid) -> i32 {
    let mut sum = 0;

    for y in 0..grid.len() as i32 {
        for x in 0..grid[0].len() as i32 {
            let point = Vec2 { x, y };

            if !is_paper_at(&point, &grid) {
                continue;
            }

            if count_neighbor_papers(&point, &grid) < 4 {
                sum += 1;
            }
        }
    }
    sum
}

fn remove_all_accessible_papers(mut grid: Grid) -> i32 {
    let mut total = 0;

    loop {
        let mut removed = 0;

        for y in 0..grid.len() as i32 {
            for x in 0..grid[0].len() as i32 {
                let point = Vec2 { x, y };

                if !is_paper_at(&point, &grid) {
                    continue;
                }

                if count_neighbor_papers(&point, &grid) < 4 {
                    removed += 1;
                    grid[y as usize][x as usize] = Tile::Empty;
                }
            }
        }

        total += removed;

        if removed == 0 {
            return total;
        }
    }
}

#[cfg(test)]
mod tests {
    #[allow(unused_imports)]
    use super::*;

    const INPUT: &str = "..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.";

    #[test]
    fn test() {
        assert_eq!(count_accessible_papers(parse(INPUT)), 13);

        assert_eq!(remove_all_accessible_papers(parse(INPUT)), 43);

        // main();
    }
}
