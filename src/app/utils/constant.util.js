export const development = 'development';

export const MsgErrorInstance =
  'Error: Não pode ser criada uma nova instância!!';

// Mensagens referente a Status
export const MsgStatus201 = 'Registrado com sucesso!';
export const MsgStatus400 =
  'Ocorreu uma falha/erro na sua requisição. Reveja os dados enviados e tente novamente!';
export const MsgStatus401 = 'Credenciais inválidas!';
export const MsgStatus401Alt = 'Usuário sem permissão ou Token inválido!';
export const MsgStatus404 = 'Item não encontrado!';
export const MsgStatus429 =
  'Limite de requisicoes ultrapassado, por favor, aguarde.';
export const MsgStatus500 = 'Erro interno no servidor!';

// Mensagens de itens inválidos
export const MsgInvalidName = 'Nome inválido!';
export const MsgInvalidDate = 'A data informada é inválida!';
export const MsgInvalidDtBirth = 'A data de nascimento informada é inválida!';
export const MsgInvalidDtBirthAlt =
  'A data de nascimento informada não corresponde a uma idade válida!';
export const MsgInvalidGender = 'Sexo inválido!';
export const MsgInvalidEmail = 'O e-mail informado é inválidos!';
export const MsgInvalidQtCharMessage = `Obrigatório informar uma mensagem com pelo menos $1 caracteres!`;
export const MsgInvalidPhone = 'O número de telefone informado é inválido!';
export const MsgInvalidDDD = 'O número de DDD informado é inválido!';
export const MsgInvalidDoc = 'O documento informado é inválido!';

// Mensagens de itens não informados
export const MsgNuDocumentUninformed = 'nuDocument Não informado!';
export const MsgIdCustomerUninformed = 'idCustomer Não informado!';

// Mensagens de itens obrigatórios
export const MsgRequiredId = 'Obrigatório informar o id';
export const MsgRequiredPhoneHasDDD =
  'Ao informar o DDD é obrigatório informar o número do telefone!';
export const MsgRequiredDDDHasPhone =
  'Ao informar o número do telefone é obrigatório informar o DDD!';
export const MsgRequiredPhoneOrEmail =
  'Obrigatório informar o E-mail, ou DDD e Telefone';

export const defRegularConfig = {
  idSuperUser: 0,
  idSuperRole: 0,
  idGuestUser: 0,
  idGuestRole: 0,
};
export const defTokenConfig = {
  tokenMinutesExpiration: 0,
  tokenSecret: '',
  tokenType: '',
};
export const defSellConfig = {
  minAgeSellProduct: 0,
  maxAgeSellProduct: 1,
  nuYearsValProduct: 0,
};
export const defMessageContactConfig = { qtMinCharMessage: 0 };
