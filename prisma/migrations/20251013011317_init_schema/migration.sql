-- CreateTable
CREATE TABLE "public"."clientes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."funcionarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "cargo" VARCHAR(50),
    "email" VARCHAR(100) NOT NULL,
    "dataContratacao" DATE NOT NULL,
    "salario" DECIMAL(10,2) NOT NULL,
    "especialidade" VARCHAR(100),
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "funcionarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ordens_servico" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" TEXT,
    "dataInicio" DATE NOT NULL,
    "dataPrevistaTermino" DATE,
    "status" VARCHAR(20) NOT NULL,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "ordens_servico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."alocacoes" (
    "funcionarioId" INTEGER NOT NULL,
    "ordemServicoId" INTEGER NOT NULL,
    "horasTrabalhadas" DECIMAL(4,2) DEFAULT 0,
    "observacoes" TEXT,
    "papel" VARCHAR(50),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alocacoes_pkey" PRIMARY KEY ("funcionarioId","ordemServicoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_email_key" ON "public"."clientes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "funcionarios_email_key" ON "public"."funcionarios"("email");

-- AddForeignKey
ALTER TABLE "public"."ordens_servico" ADD CONSTRAINT "ordens_servico_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "public"."clientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."alocacoes" ADD CONSTRAINT "alocacoes_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "public"."funcionarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."alocacoes" ADD CONSTRAINT "alocacoes_ordemServicoId_fkey" FOREIGN KEY ("ordemServicoId") REFERENCES "public"."ordens_servico"("id") ON DELETE CASCADE ON UPDATE CASCADE;
