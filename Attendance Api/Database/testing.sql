-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 25, 2022 at 03:50 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testing`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `attendanceID` int(11) NOT NULL,
  `studentID` int(11) NOT NULL,
  `courseID` int(11) NOT NULL,
  `attendance` varchar(25) DEFAULT NULL,
  `date` varchar(8) NOT NULL,
  `time` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`attendanceID`, `studentID`, `courseID`, `attendance`, `date`, `time`) VALUES
(4, 14, 103, '1', '13022022', '00:00:'),
(5, 15, 103, '1', '12022022', '00:00:'),
(6, 16, 103, '1', '12022022', '02:34:'),
(7, 32770, 103, '1', '12022022', '00:00:'),
(8, 32770, 102, '1', '12020222', '26:25:'),
(321, 17069, 103, '1', '2022224', '17630'),
(322, 17069, 103, '1', '2022224', '17636'),
(323, 17069, 102, '1', '2022224', '183616'),
(324, 17069, 102, '1', '2022224', '183617'),
(325, 17069, 102, '1', '2022224', '18383'),
(326, 17069, 102, '1', '2022224', '18388'),
(327, 17069, 102, '1', '2022224', '18397'),
(328, 18, 102, '1', '2022224', '183947'),
(329, 32719, 102, '1', '2022224', '18407');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `courseID` int(11) NOT NULL,
  `courseName` varchar(25) NOT NULL,
  `semester` int(11) NOT NULL,
  `yearID` int(11) NOT NULL,
  `programID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`courseID`, `courseName`, `semester`, `yearID`, `programID`) VALUES
(101, 'Physics', 1, 1, 100),
(102, 'Programming', 1, 1, 100),
(103, 'Algorithm', 1, 2, 200),
(104, 'Data Structures', 1, 2, 300),
(105, 'Mathematics', 2, 1, 100),
(106, 'Statistics', 1, 2, 100);

-- --------------------------------------------------------

--
-- Table structure for table `lecturer`
--

CREATE TABLE `lecturer` (
  `lecturerID` int(11) NOT NULL,
  `lecturerName` varchar(25) NOT NULL,
  `lecturerPhone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lecturer`
--

INSERT INTO `lecturer` (`lecturerID`, `lecturerName`, `lecturerPhone`) VALUES
(10, 'Emmanuel Koroma', '78618435'),
(11, 'Abu Sesay', '3322'),
(12, 'Maada Sandy', '088766663');

-- --------------------------------------------------------

--
-- Table structure for table `lecturercourses`
--

CREATE TABLE `lecturercourses` (
  `lecturerID` int(11) NOT NULL,
  `courseID` int(11) NOT NULL,
  `courseName` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lecturercourses`
--

INSERT INTO `lecturercourses` (`lecturerID`, `courseID`, `courseName`) VALUES
(10, 101, 'Physics'),
(10, 105, 'Mathematics'),
(11, 102, 'Programming'),
(11, 103, 'Algorithm'),
(12, 104, 'Data Structures');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `loginID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `userPassword` int(11) NOT NULL,
  `userFingerprintID` int(11) NOT NULL,
  `usertype` int(11) NOT NULL,
  `fullname` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`loginID`, `userID`, `userPassword`, `userFingerprintID`, `usertype`, `fullname`) VALUES
(1, 10, 12345, 1, 1, 'Mr. Emmanuel M. Koroma'),
(5, 11, 12345, 5, 2, 'Abu Sesay'),
(6, 12, 12345, 6, 2, 'Maada Sandy');

-- --------------------------------------------------------

--
-- Table structure for table `program`
--

CREATE TABLE `program` (
  `programID` int(11) NOT NULL,
  `programName` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `program`
--

INSERT INTO `program` (`programID`, `programName`) VALUES
(100, 'Computer Science'),
(200, 'Physics'),
(300, 'BIT'),
(400, 'Energy Studies'),
(500, 'Electronics'),
(800, 'Maths');

-- --------------------------------------------------------

--
-- Table structure for table `programcourses`
--

CREATE TABLE `programcourses` (
  `programID` int(11) NOT NULL,
  `courseID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `programcourses`
--

INSERT INTO `programcourses` (`programID`, `courseID`) VALUES
(100, 101),
(100, 103),
(200, 104),
(400, 101),
(500, 102);

-- --------------------------------------------------------

--
-- Table structure for table `programyear`
--

CREATE TABLE `programyear` (
  `YearID` int(11) NOT NULL,
  `programID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `programyear`
--

INSERT INTO `programyear` (`YearID`, `programID`) VALUES
(1, 100),
(3, 100),
(2, 100),
(5, 200),
(2, 300),
(3, 400);

-- --------------------------------------------------------

--
-- Table structure for table `studcourses`
--

CREATE TABLE `studcourses` (
  `courseID` int(11) NOT NULL,
  `studentID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `studcourses`
--

INSERT INTO `studcourses` (`courseID`, `studentID`) VALUES
(101, 11),
(101, 12),
(101, 13),
(102, 11),
(103, 11);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `studentID` int(11) NOT NULL,
  `sfingerprintID` int(11) NOT NULL,
  `studentName` varchar(25) NOT NULL,
  `studentEmail` varchar(25) NOT NULL,
  `studentPhone` varchar(25) NOT NULL,
  `programID` int(11) NOT NULL,
  `yearID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`studentID`, `sfingerprintID`, `studentName`, `studentEmail`, `studentPhone`, `programID`, `yearID`) VALUES
(11, 0, 'Maada Koroma', 'koro@gmail.com', '23278363232', 100, 1),
(12, 0, 'Mambu Lumeh', 'mambu@gmail.com', '078433443', 100, 1),
(13, 0, 'Peter Kallon', 'peter@gmail.com', '038484334', 100, 2),
(14, 5, 'Maada Jalloh', 'maada@gmail.com', '076434241', 200, 2),
(15, 0, 'Mohamed Jaward', 'mohamed@gmail.com', '022343444', 300, 4),
(16, 0, 'Maada Koroma', 'koro@gmail.com', '23278363232', 100, 1),
(17, 4, 'Betty Mihamed', 'embeddedcomputerexperts.o', '3344455', 200, 2),
(18, 6, 'Maada Sandy', 'maada@gmail.com', '78616444', 200, 2),
(19, 8, 'Emo', 'koromaemmanuel66@gmail.co', '888966', 200, 2),
(24, 13, 'Emmanuel Jalloh', 'emo@gmail.com', '58876', 300, 3),
(1455, 15, 'Patrick Moriba', 'pm@gmail.com', '8588', 100, 1),
(17069, 17, 'James Pundeh Kamara', 'jamespundeh@gmail.com', '33567754', 100, 1),
(32719, 18, 'Mohamed Sallieu Bah', 'mohamedsallieubah62@gmail', '78402809', 100, 1),
(32770, 16, 'Emmanuel Koroma', 'emo@gmail.com', '58588', 100, 2);

-- --------------------------------------------------------

--
-- Table structure for table `year`
--

CREATE TABLE `year` (
  `yearID` int(11) NOT NULL,
  `year` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `year`
--

INSERT INTO `year` (`yearID`, `year`) VALUES
(1, '1'),
(2, '2'),
(3, '3'),
(4, '4'),
(5, '5');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`attendanceID`),
  ADD KEY `FK_studentID` (`studentID`),
  ADD KEY `FK_CourseID` (`courseID`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`courseID`),
  ADD KEY `yearID` (`yearID`),
  ADD KEY `programID` (`programID`);

--
-- Indexes for table `lecturer`
--
ALTER TABLE `lecturer`
  ADD PRIMARY KEY (`lecturerID`);

--
-- Indexes for table `lecturercourses`
--
ALTER TABLE `lecturercourses`
  ADD UNIQUE KEY `lecturerID` (`lecturerID`,`courseID`),
  ADD KEY `courseID` (`courseID`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`loginID`);

--
-- Indexes for table `program`
--
ALTER TABLE `program`
  ADD PRIMARY KEY (`programID`);

--
-- Indexes for table `programcourses`
--
ALTER TABLE `programcourses`
  ADD KEY `courseID` (`courseID`),
  ADD KEY `programID` (`programID`);

--
-- Indexes for table `programyear`
--
ALTER TABLE `programyear`
  ADD KEY `YearID` (`YearID`),
  ADD KEY `programID` (`programID`);

--
-- Indexes for table `studcourses`
--
ALTER TABLE `studcourses`
  ADD KEY `courseID` (`courseID`),
  ADD KEY `studentID` (`studentID`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`studentID`),
  ADD KEY `programID` (`programID`),
  ADD KEY `yearID` (`yearID`);

--
-- Indexes for table `year`
--
ALTER TABLE `year`
  ADD PRIMARY KEY (`yearID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `attendanceID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=330;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `loginID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `FK_CourseID` FOREIGN KEY (`courseID`) REFERENCES `course` (`courseID`),
  ADD CONSTRAINT `FK_studentID` FOREIGN KEY (`studentID`) REFERENCES `student` (`studentID`);

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`yearID`) REFERENCES `year` (`yearID`),
  ADD CONSTRAINT `course_ibfk_2` FOREIGN KEY (`programID`) REFERENCES `program` (`programID`);

--
-- Constraints for table `lecturercourses`
--
ALTER TABLE `lecturercourses`
  ADD CONSTRAINT `lecturercourses_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `course` (`courseID`),
  ADD CONSTRAINT `lecturercourses_ibfk_2` FOREIGN KEY (`lecturerID`) REFERENCES `lecturer` (`lecturerID`);

--
-- Constraints for table `programcourses`
--
ALTER TABLE `programcourses`
  ADD CONSTRAINT `programcourses_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `course` (`courseID`),
  ADD CONSTRAINT `programcourses_ibfk_2` FOREIGN KEY (`programID`) REFERENCES `program` (`programID`);

--
-- Constraints for table `programyear`
--
ALTER TABLE `programyear`
  ADD CONSTRAINT `programyear_ibfk_1` FOREIGN KEY (`YearID`) REFERENCES `year` (`yearID`),
  ADD CONSTRAINT `programyear_ibfk_2` FOREIGN KEY (`programID`) REFERENCES `program` (`programID`);

--
-- Constraints for table `studcourses`
--
ALTER TABLE `studcourses`
  ADD CONSTRAINT `studcourses_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `course` (`courseID`),
  ADD CONSTRAINT `studcourses_ibfk_2` FOREIGN KEY (`studentID`) REFERENCES `student` (`studentID`);

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`programID`) REFERENCES `program` (`programID`),
  ADD CONSTRAINT `student_ibfk_2` FOREIGN KEY (`yearID`) REFERENCES `year` (`yearID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
