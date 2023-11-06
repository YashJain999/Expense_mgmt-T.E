SELECT * FROM lab.budget_budget;
INSERT INTO BUDGET_BUDGET (dept, f_year, item, budgeted_amt, actual_exp) 
VALUES 
('AIML', '2015', 'LAB-CONSUME', RANDOM() * 1000, RANDOM() * 1000),
('AIML', '2016', 'LAB-EQ', RANDOM() * 1000, RANDOM() * 1000),
('AIML', '2017', 'MAINT-SPARE', RANDOM() * 1000, RANDOM() * 1000),
('AIML', '2018', 'MISC', RANDOM() * 1000, RANDOM() * 1000),
('AIML', '2019', 'RND', RANDOM() * 1000, RANDOM() * 1000),
('AIML', '2020', 'SOFT', RANDOM() * 1000, RANDOM() * 1000),
('AIML', '2021', 'T&T', RANDOM() * 1000, RANDOM() * 1000),
('CIVIL', '2015', 'LAB-CONSUME', RANDOM() * 1000, RANDOM() * 1000),
('CIVIL', '2016', 'LAB-EQ', RANDOM() * 1000, RANDOM() * 1000),
('CIVIL', '2017', 'MAINT-SPARE', RANDOM() * 1000, RANDOM() * 1000),
('CIVIL', '2018', 'MISC', RANDOM() * 1000, RANDOM() * 1000),
('CIVIL', '2019', 'RND', RANDOM() * 1000, RANDOM() * 1000),
('CIVIL', '2020', 'SOFT', RANDOM() * 1000, RANDOM() * 1000),
('CIVIL', '2021', 'T&T', RANDOM() * 1000, RANDOM() * 1000);

INSERT INTO BUDGET_BUDGET (dept, f_year, item, budgeted_amt, actual_exp) VALUES
('AIML', '2015', 'LAB-CONSUME', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('AIML', '2016', 'LAB-EQ', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('AIML', '2017', 'MAINT-SPARE', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('AIML', '2018', 'MISC', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('AIML', '2019', 'RND', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('AIML', '2020', 'SOFT', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('AIML', '2021', 'T&T', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('CIVIL', '2015', 'LAB-CONSUME', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('CIVIL', '2016', 'LAB-EQ', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('CIVIL', '2017', 'MAINT-SPARE', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('CIVIL', '2018', 'MISC', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('CIVIL', '2019', 'RND', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('CIVIL', '2020', 'SOFT', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('CIVIL', '2021', 'T&T', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('CS', '2015', 'LAB-CONSUME', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('CS', '2016', 'LAB-EQ', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('CS', '2017', 'MAINT-SPARE', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('CS', '2018', 'MISC', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('CS', '2019', 'RND', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('CS', '2020', 'SOFT', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('CS', '2021', 'T&T', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('DS', '2015', 'LAB-CONSUME', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('DS', '2016', 'LAB-EQ', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('DS', '2017', 'MAINT-SPARE', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('DS', '2018', 'MISC', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('DS', '2019', 'RND', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('DS', '2020', 'SOFT', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('DS', '2021', 'T&T', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2015', 'LAB-CONSUME', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2016', 'LAB-EQ', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2017', 'MAINT-SPARE', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2018', 'MISC', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2019', 'RND', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2020', 'SOFT', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2021', 'T&T', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('MECH', '2015', 'LAB-CONSUME', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('MECH', '2016', 'LAB-EQ', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('MECH', '2017', 'MAINT-SPARE', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('MECH', '2018', 'MISC', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('MECH', '2019', 'RND', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('MECH', '2020', 'SOFT', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('MECH', '2021', 'T&T', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000));

INSERT INTO BUDGET_BUDGET (dept, f_year, item, budgeted_amt, actual_exp) VALUES
('IT', '2019', 'LAB-CONSUME', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2019', 'LAB-EQ', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2019', 'MAINT-SPARE', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2019', 'MISC', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2019', 'RND', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2019', 'SOFT', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2019', 'T&T', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2020', 'LAB-CONSUME', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2020', 'LAB-EQ', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2020', 'MAINT-SPARE', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2020', 'MISC', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2020', 'RND', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2020', 'SOFT', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2020', 'T&T', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2021', 'LAB-CONSUME', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2021', 'LAB-EQ', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2021', 'MAINT-SPARE', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2021', 'MISC', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2021', 'RND', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2021', 'SOFT', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2021', 'T&T', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2022', 'LAB-CONSUME', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2022', 'LAB-EQ', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2022', 'MAINT-SPARE', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2022', 'MISC', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2022', 'RND', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2022', 'SOFT', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2022', 'T&T', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2023', 'LAB-CONSUME', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2023', 'LAB-EQ', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2023', 'MAINT-SPARE', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2023', 'MISC', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2023', 'RND', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2023', 'SOFT', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2023', 'T&T', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2024', 'LAB-CONSUME', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2024', 'LAB-EQ', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2024', 'MAINT-SPARE', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2024', 'MISC', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2024', 'RND', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2024', 'SOFT', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000)),
('IT', '2024', 'T&T', FLOOR(RAND() * 1000), FLOOR(RAND() * 1000));
