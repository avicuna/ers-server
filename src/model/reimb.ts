export class Reimb {
    id = 0;
    reimbAmount = 0;
    reimbSubmitted = '';
    reimbResolved = '';
    reimbDescription = '';
    reimbAuthor = 0;
    reimbResolver = 0;
    reimbStatusId = 0;
    reimbTypeId = 0;

    constructor(id?: number, reimbAmount?: number, reimbSubmitted?: string,
                reimbResolved?: string, reimbDescription?: string, reimbAuthor?: number,
                reimbResolver?: number, reimbStatusId?: number, reimbTypeId?: number) {
        id && (this.id = id);
        reimbAmount && (this.reimbAmount = reimbAmount);
        reimbSubmitted && (this.reimbSubmitted = reimbSubmitted);
        reimbResolved && (this.reimbResolved = reimbResolved);
        reimbDescription && (this.reimbDescription = reimbDescription);
        reimbAuthor && (this.reimbAuthor = reimbAuthor);
        reimbResolver && (this.reimbResolver = reimbResolver);
        reimbStatusId && (this.reimbStatusId = reimbStatusId);
        reimbTypeId && (this.reimbTypeId = reimbTypeId);
    }
}