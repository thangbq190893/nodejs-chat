-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th2 03, 2020 lúc 12:45 PM
-- Phiên bản máy phục vụ: 10.1.37-MariaDB
-- Phiên bản PHP: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `nodejs_restful_api`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `password` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `reset_password` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `point` int(11) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `reset_password`, `point`, `created_at`) VALUES
(2, 'user1', 'user1@gmail.com', '$2a$10$D6OSWatfZ9XqGV2op6nuReKT8nkGykwYMRF.Ehm4sjf6PFQaS3JQe', NULL, 0, '2019-12-27'),
(3, 'user2', 'user2@gmail.com', '$2a$10$3SnCwtMJryxavB.dsEUNvOMjUCPaTcGSpu5GpoD5BeTLiFClNfpfe', NULL, 1000, '2019-12-30'),
(4, 'user3', 'user3@gmail.com', '$2a$10$13PG/mhEYzDFQ0u5SlMS..wnk2HQAyk.M8m9slP7A/vCsZZwsWcqa', NULL, 10001, '2019-12-30'),
(5, 'user26', 'user6@gmail.com', '$2a$10$KQQMB2NaVrGnW7N80K1bsOX7bZm8DdK2YL6Cgc4ji6.9wz0z5/iRy', NULL, 888, '2020-01-07');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
