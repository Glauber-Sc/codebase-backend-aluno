-- public.usuarios definition

-- Drop table

-- DROP TABLE public.usuarios;

CREATE TABLE public.usuarios (
	usuario_id bigserial NOT NULL,
	usuario_nome varchar(60) NOT NULL,
	usuario_email varchar(90) NOT NULL,
	usuario_nascimento date NULL,
	usuario_senha varchar(120) NULL,
	usuario_ativo bool NULL DEFAULT true,
	CONSTRAINT usuarios_pkey PRIMARY KEY (usuario_id)
);