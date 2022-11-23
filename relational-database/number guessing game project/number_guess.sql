--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE number_guess;
--
-- Name: number_guess; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE number_guess WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE number_guess OWNER TO freecodecamp;

\connect number_guess

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(30) NOT NULL,
    games_played integer DEFAULT 0,
    best_game integer DEFAULT 0
);


ALTER TABLE public.users OWNER TO freecodecamp;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO freecodecamp;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.users VALUES (61, 'user_1652295664234', 1, 744);
INSERT INTO public.users VALUES (62, 'user_1652295664233', 1, 975);
INSERT INTO public.users VALUES (63, 'user_1652357562148', 1, 658);
INSERT INTO public.users VALUES (64, 'user_1652357562147', 1, 528);
INSERT INTO public.users VALUES (65, 'test1', 1, 10);
INSERT INTO public.users VALUES (66, 'user_1652357674219', 1, 122);
INSERT INTO public.users VALUES (67, 'user_1652357674218', 1, 218);
INSERT INTO public.users VALUES (69, 'user_1652358034276', 1, 850);
INSERT INTO public.users VALUES (70, 'user_1652358034275', 1, 678);
INSERT INTO public.users VALUES (71, 'user_1652358112668', 1, 314);
INSERT INTO public.users VALUES (72, 'user_1652358112667', 1, 956);
INSERT INTO public.users VALUES (68, 'nick', 2, 8);
INSERT INTO public.users VALUES (73, 'user_1652358185654', 0, 0);
INSERT INTO public.users VALUES (74, 'user_1652358185653', 0, 0);
INSERT INTO public.users VALUES (75, 'user_1652358236111', 0, 0);
INSERT INTO public.users VALUES (76, 'user_1652358236110', 0, 0);
INSERT INTO public.users VALUES (77, 'user_1652358252815', 1, 289);
INSERT INTO public.users VALUES (78, 'user_1652358252814', 1, 341);
INSERT INTO public.users VALUES (79, 'user_1652359444228', 1, 528);
INSERT INTO public.users VALUES (80, 'user_1652359444227', 1, 828);
INSERT INTO public.users VALUES (81, 'user_1652359541200', 1, 754);
INSERT INTO public.users VALUES (82, 'user_1652359541199', 1, 746);
INSERT INTO public.users VALUES (83, 'user_1652360179193', 1, 511);
INSERT INTO public.users VALUES (84, 'user_1652360179192', 1, 126);
INSERT INTO public.users VALUES (85, 'user_1652360770092', 1, 34);
INSERT INTO public.users VALUES (86, 'user_1652360770091', 1, 798);
INSERT INTO public.users VALUES (87, 'user_1652361113610', 1, 245);
INSERT INTO public.users VALUES (88, 'user_1652361113609', 1, 352);
INSERT INTO public.users VALUES (60, 'test', 2, 9);
INSERT INTO public.users VALUES (89, 'user_1652361869029', 0, 0);
INSERT INTO public.users VALUES (90, 'user_1652361869028', 0, 0);
INSERT INTO public.users VALUES (91, 'test2', 1, 11);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.users_user_id_seq', 91, true);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- PostgreSQL database dump complete
--

