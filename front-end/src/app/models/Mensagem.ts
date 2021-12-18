export class Mensagem {
    constructor(
        public id: string,
        public mensagem: string,
        public categoria: {
            id: string,
            nome: string
        },
    ) { }
}