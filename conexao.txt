CREATE TABLE public.alunos (
	aluno_id serial4 NOT NULL,
	aluno_matricula varchar(50) NOT NULL,
	aluno_curso varchar(100) NOT NULL,
	aluno_horario varchar(50) NOT NULL,
	aluno_idade int4 NOT NULL,
	aluno_nome varchar(100) NOT NULL,
	aluno_email varchar(100) NOT NULL,
	aluno_data_nascimento date NOT NULL,
	CONSTRAINT alunos_pkey PRIMARY KEY (aluno_id)
);




CREATE TABLE public.usuarios (
	usuario_id serial4 NOT NULL,
	usuario_nome varchar(100) NOT NULL,
	usuario_email varchar(100) NOT NULL,
	usuario_senha bpchar(32) NOT NULL,
	usuario_nascimento date NOT NULL,
	usuario_ativo bool NOT NULL,
	CONSTRAINT usuarios_pkey PRIMARY KEY (usuario_id),
	CONSTRAINT usuarios_usuario_email_key UNIQUE (usuario_email)
);