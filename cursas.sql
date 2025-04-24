-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Окт 01 2024 г., 02:46
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `cursas`
--

-- --------------------------------------------------------

--
-- Структура таблицы `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `sent_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_read` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `suggesttopic`
--

CREATE TABLE `suggesttopic` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `teacher` varchar(100) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` varchar(1000) NOT NULL DEFAULT 'Нет комментария.',
  `username` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `topicfree`
--

CREATE TABLE `topicfree` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `teacher` varchar(100) NOT NULL,
  `description` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `topicfree`
--

INSERT INTO `topicfree` (`id`, `name`, `teacher`, `description`) VALUES
(1, 'Приложение для продажи виниловых пластинок', 'Рябец Леонид Владимирович', 'Разработка веб-приложения для покупки виниловых пластинок должна\r\nсоответствовать определенным требованиям, чтобы обеспечить его функциональность, простоту использования и надежность. Вот основные требования к\r\nразрабатываемому приложению:\r\n1) Поиск по ключевым словам.\r\n2) Интуитивно понятный интерфейс.\r\n3) Фильтрация списка пластинок.\r\n4) Возможность оставлять комментарии.\r\n6) Обработка ошибок и исключений.\r\n7) Удобная работа с пластинками для администраторов.\r\n8) Возможность добавления пластинок в корзину.'),
(32, 'Новая тема 1', 'учитель 1', 'описание 1');

-- --------------------------------------------------------

--
-- Структура таблицы `topiclock`
--

CREATE TABLE `topiclock` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `teacher` varchar(100) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `topiclock`
--

INSERT INTO `topiclock` (`id`, `name`, `teacher`, `description`, `user_id`, `username`) VALUES
(33, 'Приложения для выбора курсовой работы', 'Петров Иван Алексеевич', 'В этом приложении можно...', 12, 'Петров Иван Алексеевич');

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(120) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `role`) VALUES
(4, 'Петров', '$2a$10$9cLzzsg1CLCSUv8hNc8isuMVYAwcfcXpkkq05f1n2laaVXfPZffm2', 'ROLE_USER'),
(5, 'Сенькин', '$2a$10$vYWx3VW2Bcs8DWbyvIE/HuBGuIxHfuP7emymu18Pq5YimJt7htJIK', 'ROLE_USER'),
(11, 'Рябец Леонид Владимирович', '$2a$10$Wvgvrpug/j2ATk640l.PueRSWFS20kHnu/WtxD84XVrOYSeYg6.jK', 'ROLE_ADMIN'),
(12, 'Петров Иван Алексеевич', '$2a$10$0pd4SFxzR96yB0WKQ1oeTu8zMqfJPfAD9mBdnstZlquWdFcIRkZTe', 'ROLE_USER');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Индексы таблицы `suggesttopic`
--
ALTER TABLE `suggesttopic`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `topicfree`
--
ALTER TABLE `topicfree`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `topiclock`
--
ALTER TABLE `topiclock`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKsb8bbouer5wak8vyiiy4pf2bx` (`username`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `suggesttopic`
--
ALTER TABLE `suggesttopic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `topicfree`
--
ALTER TABLE `topicfree`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT для таблицы `topiclock`
--
ALTER TABLE `topiclock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
