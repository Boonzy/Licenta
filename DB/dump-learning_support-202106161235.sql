--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

-- Started on 2021-06-16 12:35:18

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

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3044 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 208 (class 1259 OID 16480)
-- Name: documents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.documents (
    document_id integer NOT NULL,
    document_link text NOT NULL,
    document_tags jsonb NOT NULL,
    document_name text NOT NULL,
    document_description text
);


ALTER TABLE public.documents OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 16478)
-- Name: documents_document_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.documents_document_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.documents_document_id_seq OWNER TO postgres;

--
-- TOC entry 3045 (class 0 OID 0)
-- Dependencies: 207
-- Name: documents_document_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.documents_document_id_seq OWNED BY public.documents.document_id;


--
-- TOC entry 203 (class 1259 OID 16407)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    role_id integer NOT NULL,
    role_name character varying NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16405)
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_role_id_seq OWNER TO postgres;

--
-- TOC entry 3046 (class 0 OID 0)
-- Dependencies: 202
-- Name: roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_role_id_seq OWNED BY public.roles.role_id;


--
-- TOC entry 205 (class 1259 OID 16445)
-- Name: tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tags (
    tag_id integer NOT NULL,
    tag_name character varying NOT NULL,
    tag_values text[]
);


ALTER TABLE public.tags OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16443)
-- Name: tags_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tags_tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tags_tag_id_seq OWNER TO postgres;

--
-- TOC entry 3047 (class 0 OID 0)
-- Dependencies: 204
-- Name: tags_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tags_tag_id_seq OWNED BY public.tags.tag_id;


--
-- TOC entry 206 (class 1259 OID 16463)
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    user_id integer NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16397)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    password_hash character varying(50) NOT NULL,
    username character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16395)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 3048 (class 0 OID 0)
-- Dependencies: 200
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 2878 (class 2604 OID 16483)
-- Name: documents document_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents ALTER COLUMN document_id SET DEFAULT nextval('public.documents_document_id_seq'::regclass);


--
-- TOC entry 2876 (class 2604 OID 16410)
-- Name: roles role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN role_id SET DEFAULT nextval('public.roles_role_id_seq'::regclass);


--
-- TOC entry 2877 (class 2604 OID 16448)
-- Name: tags tag_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags ALTER COLUMN tag_id SET DEFAULT nextval('public.tags_tag_id_seq'::regclass);


--
-- TOC entry 2875 (class 2604 OID 16400)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 3038 (class 0 OID 16480)
-- Dependencies: 208
-- Data for Name: documents; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.documents VALUES (1, 'https://drive.google.com/file/d/1MdYroBqKF92T_WHlt-vnRf7zpariRr3v/view?usp=sharing', '{"Anul": ["I", "II"], "Materia": ["Matematica"], "Facultate": ["Facultatea de Informatica"], "Material Didactic": ["Curs"]}', 'Matematica', 'Nume curs');
INSERT INTO public.documents VALUES (8, 'https://drive.google.com/file/d/1pBLubdw91RKFLMpupAjMkkbGvYzKLjao/view?usp=sharing', '{"Anul": ["I", "II", "III"], "Materia": ["Matematica"], "Facultate": ["Facultatea de Finante"], "Material Didactic": ["Curs"]}', 'Matematica II', 'Nume');
INSERT INTO public.documents VALUES (9, 'https://drive.google.com/file/d/1ajIWFUjkp0O9szrcvMPeZqjAqk973H6v/view?usp=sharing', '{"Anul": ["I"], "Materia": ["Statistica"], "Facultate": ["Facultatea de Finante"], "Material Didactic": ["Curs"]}', 'Statistica', 'Nume cursul 1');
INSERT INTO public.documents VALUES (12, 'https://drive.google.com/file/d/15VpHEaoNtzIB-xetaFft75a5YRUiY51B/view?usp=sharing', '{"Anul": ["I", "II", "III"], "Materia": ["Drept"], "Facultate": ["Facultatea de Drept"], "Material Didactic": ["Curs"]}', 'Drept', 'Nume cu rs');
INSERT INTO public.documents VALUES (11, 'https://drive.google.com/file/d/1Fji9ogfu4uQMIkEK4OM5YQYx3KX7Ha3E/view?usp=sharing', '{"Anul": ["I"], "Materia": ["Matematica"], "Facultate": ["Facultatea de Informatica"], "Material Didactic": ["Curs"]}', 'Matematica I', 'Nume curse');


--
-- TOC entry 3033 (class 0 OID 16407)
-- Dependencies: 203
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.roles VALUES (1, 'student');
INSERT INTO public.roles VALUES (2, 'profesor');
INSERT INTO public.roles VALUES (3, 'admin');


--
-- TOC entry 3035 (class 0 OID 16445)
-- Dependencies: 205
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tags VALUES (3, 'Facultate', '{"Facultatea de Informatica","Facultatea de Finante","Facultatea de Drept"}');
INSERT INTO public.tags VALUES (4, 'Material Didactic', '{Curs,Seminar,Laborator,Altele}');
INSERT INTO public.tags VALUES (2, 'Materia', '{Matematica,Microeconomie,Macroeconomie,Engleza,"Libmaje de Progamare"}');
INSERT INTO public.tags VALUES (1, 'Anul', '{I,II,III,IV}');


--
-- TOC entry 3036 (class 0 OID 16463)
-- Dependencies: 206
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_roles VALUES (5, 1);
INSERT INTO public.user_roles VALUES (6, 1);
INSERT INTO public.user_roles VALUES (7, 1);
INSERT INTO public.user_roles VALUES (9, 1);
INSERT INTO public.user_roles VALUES (10, 1);
INSERT INTO public.user_roles VALUES (11, 1);
INSERT INTO public.user_roles VALUES (12, 1);
INSERT INTO public.user_roles VALUES (13, 1);
INSERT INTO public.user_roles VALUES (14, 1);
INSERT INTO public.user_roles VALUES (15, 1);
INSERT INTO public.user_roles VALUES (16, 1);
INSERT INTO public.user_roles VALUES (17, 1);
INSERT INTO public.user_roles VALUES (18, 1);
INSERT INTO public.user_roles VALUES (19, 1);
INSERT INTO public.user_roles VALUES (20, 1);
INSERT INTO public.user_roles VALUES (21, 1);
INSERT INTO public.user_roles VALUES (22, 1);
INSERT INTO public.user_roles VALUES (23, 1);
INSERT INTO public.user_roles VALUES (24, 1);
INSERT INTO public.user_roles VALUES (25, 1);
INSERT INTO public.user_roles VALUES (26, 1);
INSERT INTO public.user_roles VALUES (27, 1);
INSERT INTO public.user_roles VALUES (28, 1);
INSERT INTO public.user_roles VALUES (29, 1);
INSERT INTO public.user_roles VALUES (30, 1);
INSERT INTO public.user_roles VALUES (31, 1);
INSERT INTO public.user_roles VALUES (32, 1);
INSERT INTO public.user_roles VALUES (33, 1);
INSERT INTO public.user_roles VALUES (34, 1);
INSERT INTO public.user_roles VALUES (35, 1);
INSERT INTO public.user_roles VALUES (36, 1);
INSERT INTO public.user_roles VALUES (37, 1);
INSERT INTO public.user_roles VALUES (38, 1);
INSERT INTO public.user_roles VALUES (39, 1);
INSERT INTO public.user_roles VALUES (40, 1);
INSERT INTO public.user_roles VALUES (41, 1);
INSERT INTO public.user_roles VALUES (42, 1);
INSERT INTO public.user_roles VALUES (43, 1);
INSERT INTO public.user_roles VALUES (44, 1);
INSERT INTO public.user_roles VALUES (45, 1);
INSERT INTO public.user_roles VALUES (46, 1);
INSERT INTO public.user_roles VALUES (47, 1);
INSERT INTO public.user_roles VALUES (48, 1);
INSERT INTO public.user_roles VALUES (49, 1);
INSERT INTO public.user_roles VALUES (50, 1);
INSERT INTO public.user_roles VALUES (51, 1);
INSERT INTO public.user_roles VALUES (52, 1);
INSERT INTO public.user_roles VALUES (53, 1);
INSERT INTO public.user_roles VALUES (54, 1);
INSERT INTO public.user_roles VALUES (55, 1);
INSERT INTO public.user_roles VALUES (56, 1);
INSERT INTO public.user_roles VALUES (57, 1);
INSERT INTO public.user_roles VALUES (58, 1);
INSERT INTO public.user_roles VALUES (59, 1);
INSERT INTO public.user_roles VALUES (60, 1);
INSERT INTO public.user_roles VALUES (61, 1);
INSERT INTO public.user_roles VALUES (62, 1);
INSERT INTO public.user_roles VALUES (63, 1);
INSERT INTO public.user_roles VALUES (64, 2);
INSERT INTO public.user_roles VALUES (65, 2);
INSERT INTO public.user_roles VALUES (66, 2);
INSERT INTO public.user_roles VALUES (67, 2);
INSERT INTO public.user_roles VALUES (68, 2);
INSERT INTO public.user_roles VALUES (69, 2);
INSERT INTO public.user_roles VALUES (70, 2);
INSERT INTO public.user_roles VALUES (71, 2);
INSERT INTO public.user_roles VALUES (72, 2);
INSERT INTO public.user_roles VALUES (73, 2);
INSERT INTO public.user_roles VALUES (2, 3);
INSERT INTO public.user_roles VALUES (78, 1);
INSERT INTO public.user_roles VALUES (80, 2);
INSERT INTO public.user_roles VALUES (81, 1);
INSERT INTO public.user_roles VALUES (84, 1);
INSERT INTO public.user_roles VALUES (8, 1);


--
-- TOC entry 3031 (class 0 OID 16397)
-- Dependencies: 201
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (2, 'Mihai', 'Broscauceanu', 'qwe123', 'MihaiBroscauceanu2');
INSERT INTO public.users VALUES (81, 'Chynaq', 'Valentin', '', NULL);
INSERT INTO public.users VALUES (78, 'Maria', 'Broscauceanu', 'qwe123', NULL);
INSERT INTO public.users VALUES (5, 'Chynaa', 'Valentin', 'qwe123', 'ChynaValentin5');
INSERT INTO public.users VALUES (8, 'Walta', 'Huguo', 'qwe123', 'WaltHuguo8');
INSERT INTO public.users VALUES (6, 'Phocas', 'Olavo', 'qwe123', 'PhocasOlavo6');
INSERT INTO public.users VALUES (7, 'Saturnino', 'Shalva', 'qwe123', 'SaturninoShalva7');
INSERT INTO public.users VALUES (9, 'Anoop', 'Mongkut', 'qwe123', 'AnoopMongkut9');
INSERT INTO public.users VALUES (10, 'Stefana', 'Ruslana', 'qwe123', 'StefanaRuslana10');
INSERT INTO public.users VALUES (11, 'Havryil', 'Fülöp', 'qwe123', 'HavryilFülöp11');
INSERT INTO public.users VALUES (12, 'Helmo', 'Ornella', 'qwe123', 'HelmoOrnella12');
INSERT INTO public.users VALUES (13, 'Pantheras', 'Mathijs', 'qwe123', 'PantherasMathijs13');
INSERT INTO public.users VALUES (14, 'Dikeledi', 'Everette', 'qwe123', 'DikelediEverette14');
INSERT INTO public.users VALUES (15, 'Pihla', 'Dan', 'qwe123', 'PihlaDan15');
INSERT INTO public.users VALUES (16, 'Shaniqua', 'Joan', 'qwe123', 'ShaniquaJoan16');
INSERT INTO public.users VALUES (17, 'Miloš', 'Amittai', 'qwe123', 'MilošAmittai17');
INSERT INTO public.users VALUES (18, 'Yishai', 'Sunan', 'qwe123', 'YishaiSunan18');
INSERT INTO public.users VALUES (19, 'Morana', 'Piero', 'qwe123', 'MoranaPiero19');
INSERT INTO public.users VALUES (20, 'Cynemær', 'Florus', 'qwe123', 'CynemærFlorus20');
INSERT INTO public.users VALUES (21, 'Milian', 'Galadriel', 'qwe123', 'MilianGaladriel21');
INSERT INTO public.users VALUES (22, 'Priapos', 'Inga', 'qwe123', 'PriaposInga22');
INSERT INTO public.users VALUES (23, 'Vanda', 'Atticus', 'qwe123', 'VandaAtticus23');
INSERT INTO public.users VALUES (24, 'Pavelu', 'Periklis', 'qwe123', 'PaveluPeriklis24');
INSERT INTO public.users VALUES (25, 'Sisko', 'Markku', 'qwe123', 'SiskoMarkku25');
INSERT INTO public.users VALUES (26, 'Marc', 'Zhivka', 'qwe123', 'MarcZhivka26');
INSERT INTO public.users VALUES (27, 'Goyathlay', 'Bettina', 'qwe123', 'GoyathlayBettina27');
INSERT INTO public.users VALUES (28, 'Rokurō', 'Isolde', 'qwe123', 'RokurōIsolde28');
INSERT INTO public.users VALUES (29, 'Albin', 'Ken''ichi', 'qwe123', 'AlbinKen''ichi29');
INSERT INTO public.users VALUES (30, 'Ambrosios', 'Tanvi', 'qwe123', 'AmbrosiosTanvi30');
INSERT INTO public.users VALUES (31, 'Mads', 'Émile', 'qwe123', 'MadsÉmile31');
INSERT INTO public.users VALUES (32, 'Rita', 'Ginka', 'qwe123', 'RitaGinka32');
INSERT INTO public.users VALUES (33, 'Emigdia', 'Germund', 'qwe123', 'EmigdiaGermund33');
INSERT INTO public.users VALUES (34, 'Ikenna', 'Oghenekaro', 'qwe123', 'IkennaOghenekaro34');
INSERT INTO public.users VALUES (35, 'Wiktor', 'Mattityahu', 'qwe123', 'WiktorMattityahu35');
INSERT INTO public.users VALUES (36, 'Gregor', 'Agapios', 'qwe123', 'GregorAgapios36');
INSERT INTO public.users VALUES (37, 'Aaminata', 'Lyndon', 'qwe123', 'AaminataLyndon37');
INSERT INTO public.users VALUES (38, 'Malte', 'Dragoljub', 'qwe123', 'MalteDragoljub38');
INSERT INTO public.users VALUES (39, 'Cherette', 'Yishai', 'qwe123', 'CheretteYishai39');
INSERT INTO public.users VALUES (40, 'Tilde', 'Dmitry', 'qwe123', 'TildeDmitry40');
INSERT INTO public.users VALUES (41, 'Vladimer', 'Kanti', 'qwe123', 'VladimerKanti41');
INSERT INTO public.users VALUES (42, 'Priti', 'Brendan', 'qwe123', 'PritiBrendan42');
INSERT INTO public.users VALUES (43, 'Jan', 'Aras', 'qwe123', 'JanAras43');
INSERT INTO public.users VALUES (44, 'Muirgen', 'Odarka', 'qwe123', 'MuirgenOdarka44');
INSERT INTO public.users VALUES (45, 'Amahle', 'Papa', 'qwe123', 'AmahlePapa45');
INSERT INTO public.users VALUES (46, 'Radobod', 'Ladislas', 'qwe123', 'RadobodLadislas46');
INSERT INTO public.users VALUES (47, 'Nina', 'Tomáš', 'qwe123', 'NinaTomáš47');
INSERT INTO public.users VALUES (48, 'Constance', 'Pyrrhus', 'qwe123', 'ConstancePyrrhus48');
INSERT INTO public.users VALUES (49, 'Jackin', 'Kai', 'qwe123', 'JackinKai49');
INSERT INTO public.users VALUES (50, 'Suman', 'Shlomo', 'qwe123', 'SumanShlomo50');
INSERT INTO public.users VALUES (51, 'Gavrila', 'Ráichéal', 'qwe123', 'GavrilaRáichéal51');
INSERT INTO public.users VALUES (52, 'Honey', 'Susanna', 'qwe123', 'HoneySusanna52');
INSERT INTO public.users VALUES (53, 'Katleho', 'Faraji', 'qwe123', 'KatlehoFaraji53');
INSERT INTO public.users VALUES (54, 'Sisu', 'Hyginus', 'qwe123', 'SisuHyginus54');
INSERT INTO public.users VALUES (55, 'Lino', 'Delfina', 'qwe123', 'LinoDelfina55');
INSERT INTO public.users VALUES (56, 'Viktoryia', 'Sandhya', 'qwe123', 'ViktoryiaSandhya56');
INSERT INTO public.users VALUES (57, 'Leda', 'Junius', 'qwe123', 'LedaJunius57');
INSERT INTO public.users VALUES (58, 'Fidan', 'Kei', 'qwe123', 'FidanKei58');
INSERT INTO public.users VALUES (59, 'Isidora', 'Alim', 'qwe123', 'IsidoraAlim59');
INSERT INTO public.users VALUES (60, 'Josseline', 'Noè', 'qwe123', 'JosselineNoè60');
INSERT INTO public.users VALUES (61, 'Rachel', 'Agilulf', 'qwe123', 'RachelAgilulf61');
INSERT INTO public.users VALUES (62, 'Sonnie', 'Deepak', 'qwe123', 'SonnieDeepak62');
INSERT INTO public.users VALUES (63, 'Lockie', 'Nazar', 'qwe123', 'LockieNazar63');
INSERT INTO public.users VALUES (64, 'Egídio', 'Danka', 'qwe123', 'EgídioDanka64');
INSERT INTO public.users VALUES (65, 'Shealtiel', 'Doris', 'qwe123', 'ShealtielDoris65');
INSERT INTO public.users VALUES (66, 'Joakim', 'Rumpelstiltskin', 'qwe123', 'JoakimRumpelstiltskin66');
INSERT INTO public.users VALUES (67, 'Andrea', 'Ram', 'qwe123', 'AndreaRam67');
INSERT INTO public.users VALUES (68, 'Yerushah', 'Karoliina', 'qwe123', 'YerushahKaroliina68');
INSERT INTO public.users VALUES (69, 'Abidemi', 'Lubomíra', 'qwe123', 'AbidemiLubomíra69');
INSERT INTO public.users VALUES (70, 'Fuad', 'Albert', 'qwe123', 'FuadAlbert70');
INSERT INTO public.users VALUES (71, 'Sonny', 'Yejide', 'qwe123', 'SonnyYejide71');
INSERT INTO public.users VALUES (72, 'Chenaniah', 'Merilyn', 'qwe123', 'ChenaniahMerilyn72');
INSERT INTO public.users VALUES (73, 'Shun', 'Modestus', 'qwe123', 'ShunModestus73');
INSERT INTO public.users VALUES (80, 'John', 'Doe', '', NULL);
INSERT INTO public.users VALUES (84, 'Jane', 'Doe', 'qwe123', NULL);


--
-- TOC entry 3049 (class 0 OID 0)
-- Dependencies: 207
-- Name: documents_document_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.documents_document_id_seq', 23, true);


--
-- TOC entry 3050 (class 0 OID 0)
-- Dependencies: 202
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_role_id_seq', 3, true);


--
-- TOC entry 3051 (class 0 OID 0)
-- Dependencies: 204
-- Name: tags_tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tags_tag_id_seq', 6, true);


--
-- TOC entry 3052 (class 0 OID 0)
-- Dependencies: 200
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 84, true);


--
-- TOC entry 2893 (class 2606 OID 16490)
-- Name: documents documents_document_link_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_document_link_key UNIQUE (document_link);


--
-- TOC entry 2895 (class 2606 OID 16492)
-- Name: documents documents_document_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_document_name_key UNIQUE (document_name);


--
-- TOC entry 2897 (class 2606 OID 16488)
-- Name: documents documents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (document_id);


--
-- TOC entry 2883 (class 2606 OID 16415)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- TOC entry 2885 (class 2606 OID 16417)
-- Name: roles roles_role_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key UNIQUE (role_name);


--
-- TOC entry 2887 (class 2606 OID 16453)
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (tag_id);


--
-- TOC entry 2889 (class 2606 OID 16455)
-- Name: tags tags_tag_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_tag_name_key UNIQUE (tag_name);


--
-- TOC entry 2891 (class 2606 OID 16467)
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id);


--
-- TOC entry 2881 (class 2606 OID 16402)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 2879 (class 1259 OID 16456)
-- Name: users_names; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_names ON public.users USING btree (((((first_name)::text || ' '::text) || (last_name)::text)));


--
-- TOC entry 2898 (class 2606 OID 16468)
-- Name: user_roles user_roles_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(role_id);


--
-- TOC entry 2899 (class 2606 OID 16493)
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


-- Completed on 2021-06-16 12:35:19

--
-- PostgreSQL database dump complete
--

