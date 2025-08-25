// scripts/find-unused-ui.js
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter o diretório atual em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uiDir = path.join(__dirname, '../src/components/ui');
const srcDir = path.join(__dirname, '../src');

console.log('🔍 Verificando componentes UI não utilizados...\n');

// Componentes que devem ser mantidos mesmo se não forem detectados como utilizados
const essentialComponents = ['button', 'toast', 'toaster', 'form', 'dialog'];

const unusedComponents = [];
const usedComponents = [];

// Verificar se o diretório existe
if (!fs.existsSync(uiDir)) {
  console.error(`❌ Diretório não encontrado: ${uiDir}`);
  process.exit(1);
}

// Função para verificar se um componente é usado
function isComponentUsed(componentName, fileName) {
  try {
    // Busca por importações do componente em arquivos .ts e .tsx
    // Usa aspas simples para o comando shell e escapa corretamente
    const result = execSync(
      `grep -r "from ['\\"]@/components/ui/${componentName}['\\"]" ${srcDir} --include="*.tsx" --include="*.ts" | grep -v "src/components/ui/${fileName}"`,
      { encoding: 'utf-8' }
    );
    
    // Se encontrou algum uso, retorna true
    return result.trim().length > 0;
  } catch {
    // grep retorna código de erro quando não encontra nada
    return false;
  }
}

// Processa cada arquivo .tsx no diretório UI
fs.readdirSync(uiDir)
  .filter(file => file.endsWith('.tsx'))
  .forEach(file => {
    const componentName = path.basename(file, '.tsx');
    
    // Pular componentes essenciais
    if (essentialComponents.includes(componentName)) {
      console.log(`⭐ Mantendo componente essencial: ${componentName}`);
      usedComponents.push(file);
      return;
    }
    
    // Verificar se o componente é usado
    if (isComponentUsed(componentName, file)) {
      console.log(`✅ Componente em uso: ${componentName}`);
      usedComponents.push(file);
    } else {
      console.log(`❌ Componente não utilizado: ${componentName}`);
      unusedComponents.push(file);
    }
  });

// Mostrar resultados
if (unusedComponents.length > 0) {
  console.log('\n--- COMPONENTES UI NÃO UTILIZADOS ---');
  console.log(`Total: ${unusedComponents.length} componentes podem ser removidos`);
  unusedComponents.forEach(comp => console.log(`- ${comp}`));
  
  // Comando para backup
  console.log('\nComando para criar backup:');
  console.log(`mkdir -p ui-backup && cp ${unusedComponents.map(c => `src/components/ui/${c}`).join(' ')} ui-backup/`);
  
  // Comando para remover
  console.log('\nComando para remover:');
  console.log(`rm ${unusedComponents.map(c => `src/components/ui/${c}`).join(' ')}`);
}

console.log('\n--- RESUMO ---');
console.log(`Total de componentes UI: ${usedComponents.length + unusedComponents.length}`);
console.log(`Componentes em uso: ${usedComponents.length}`);
console.log(`Componentes não utilizados: ${unusedComponents.length}`);