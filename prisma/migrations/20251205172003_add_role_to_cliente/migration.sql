-- AlterTable
ALTER TABLE "clientes" ADD COLUMN     "role" VARCHAR(20) NOT NULL DEFAULT 'cliente';

-- AlterTable
ALTER TABLE "funcionarios" ADD COLUMN     "role" VARCHAR(20) NOT NULL DEFAULT 'funcionario';

-- CreateIndex
CREATE INDEX "alocacoes_funcionarioId_idx" ON "alocacoes"("funcionarioId");

-- CreateIndex
CREATE INDEX "alocacoes_ordemServicoId_idx" ON "alocacoes"("ordemServicoId");

-- CreateIndex
CREATE INDEX "clientes_email_idx" ON "clientes"("email");

-- CreateIndex
CREATE INDEX "funcionarios_email_idx" ON "funcionarios"("email");

-- CreateIndex
CREATE INDEX "funcionarios_ativo_idx" ON "funcionarios"("ativo");

-- CreateIndex
CREATE INDEX "ordens_servico_clienteId_idx" ON "ordens_servico"("clienteId");

-- CreateIndex
CREATE INDEX "ordens_servico_status_idx" ON "ordens_servico"("status");

-- CreateIndex
CREATE INDEX "ordens_servico_dataInicio_idx" ON "ordens_servico"("dataInicio");

-- CreateIndex
CREATE INDEX "ordens_servico_clienteId_status_idx" ON "ordens_servico"("clienteId", "status");
