let instance;

class ConstantUtil {
  constructor() {
    this.development = 'development';
    this.MsgErrorInstance = 'Error: Não pode ser criada uma nova instância!!';
    this.MsgStatus201 = 'Registrado com sucesso!';
    this.MsgStatus400 =
      'Ocorreu uma falha/erro na sua requisição. Reveja os dados enviados e tente novamente!';
    this.MsgStatus401 = 'Credenciais inválidas!';
    this.MsgStatus401Alt = 'Usuário sem permissão ou Token inválido!';
    this.MsgStatus404 = 'Item não encontrado!';
    this.MsgStatus429 =
      'Limite de requisições ultrapassado, por favor, aguarde.';
    this.MsgStatus500 = 'Erro interno no servidor!';
    this.MsgInvalidName = 'Nome inválido!';
    this.MsgInvalidDate = 'A data informada é inválida!';
    this.MsgInvalidDtBirth = 'A data de nascimento informada é inválida!';
    this.MsgInvalidAge =
      'A data de nascimento informada não corresponde a uma idade válida!';
    this.MsgInvalidGender = 'Sexo inválido!';
    this.MsgInvalidEmail = 'O e-mail informado é inválido!';
    this.MsgInvalidQtCharMessage = `Obrigatório informar uma mensagem com pelo menos $1 caracteres!`;
    this.MsgInvalidPhone = 'O número de telefone informado é inválido!';
    this.MsgInvalidDDD = 'O número de DDD informado é inválido!';
    this.MsgInvalidDoc = 'O documento informado é inválido!';
    this.MsgNuDocumentUninformed = 'nuDocument Não informado!';
    this.MsgIdCustomerUninformed = 'idCustomer Não informado!';
    this.MsgRequiredId = 'Obrigatório informar o id';
    this.MsgInvalidId = 'O id informado é inválido!';
    this.MsgRequiredPhoneHasDDD =
      'Ao informar o DDD é obrigatório informar o número do telefone!';
    this.MsgRequiredDDDHasPhone =
      'Ao informar o número do telefone é obrigatório informar o DDD!';
    this.MsgRequiredPhoneOrEmail =
      'Obrigatório informar o E-mail, ou DDD e Telefone';
    this.defRegularConfig = {
      idSuperUser: 0,
      idSuperRole: 0,
      idGuestUser: 0,
      idGuestRole: 0,
    };
    this.defTokenConfig = {
      tokenMinutesExpiration: 0,
      tokenSecret: '',
      tokenType: '',
    };
    this.defSellConfig = {
      minAgeSellProduct: 0,
      maxAgeSellProduct: 1,
      nuYearsValProduct: 0,
    };
    this.defMessageContactConfig = { qtMinCharMessage: 0 };
  }

  static getInstance() {
    if (!instance) {
      instance = new ConstantUtil();
      Object.freeze(instance);
    }
    return instance;
  }
}

export default ConstantUtil.getInstance();
