INSERT INTO departments (dept_name)
VALUES  ("Design"), -- 1
        ("Engineering"), -- 2
        ("Marketing"), -- 3
        ("IT"), -- 4
        ("HR"), -- 5
        ("Finance"), -- 6
        ("Legal"); -- 7
       
INSERT INTO roles (title, salary, dept_id)
VALUES  ("Digital Content Producer", 60000, 3), -- 1
        ("Senior Software Engineer", 130000, 2), -- 2
        ("Software Engineer", 100000, 2), -- 3
        ("Junior Developer", 70000, 2), -- 4
        ("Tech Support Specialist", 60000, 4), -- 5
        ("Part-time Technician", 40000, 4), -- 6
        ("Lead Artist", 130000, 1), -- 7
        ("Digital Content Manager", 130000, 3), -- 8
        ("Recruiter", 60000, 5), -- 9
        ("HR Coordinator", 70000, 5), -- 10
        ("Accountant", 100000, 6), -- 11
        ("Lawyer", 130000, 7), -- 12
        ("Paralegal", 100000, 7), -- 13
        ("Engineering Team Lead", 160000, 2); -- 14
       
INSERT INTO employees (first_name, last_name, dept_id, role_id, manager_id)
VALUES  ("Olivia", "Colomar", 2, 14, null), -- 1
        ("Vivian", "Chase", 5, 10, null), -- 2
        ("Moira", "O'Deorain", 6, 11, null), -- 3
        ("Satya", "Vaswani", 7, 12, null), -- 4
        ("Torbjörn", "Lindholm", 4, 5, null), -- 5
        ("Lena", "Oxton", 1, 7, null), -- 6 lead artist
        ("Fareeha", "Amari", 3, 8, null), -- 7
        ("Winston", "Overwatch", 2, 2, 1), -- 8
        ("Amélie", "Lacroix", 7, 13, 4), -- 8
        ("Jean-Baptiste", "Augustin", 5, 9, 2), -- 9
        ("Kiriko", "Kamori", 3, 1, 6), -- 10
        ("Lúcio", "Correia dos Santos", 3, 1, 7),
        ("Angela", "Ziegler", 2, 3, 1),
        ("Tekhartha", "Zenyatta", 2, 4, 1),
        ("Hana", "Song", 3, 1, 6),
        ("Akande", "Ogundimu", 5, 9, 2),
        ("Odessa", "Stone", 7, 13, 4),
        ("Mako", "Rutledge", 2, 4, 1);