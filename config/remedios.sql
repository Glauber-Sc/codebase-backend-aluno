-- public.remedios definition

-- Drop table

-- DROP TABLE public.remedios;

CREATE TABLE public.remedios (
	remedio_id bigserial NOT NULL,
	remedio_nome varchar(60) NOT NULL,
	remedio_preco numeric NOT NULL,
	remedio_genero varchar(15) NULL,
	remedio_estoque bool NULL DEFAULT true,
	CONSTRAINT remedios_pkey PRIMARY KEY (remedio_id)
);