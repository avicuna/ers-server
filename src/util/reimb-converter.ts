import {SqlReimb} from "../dto/sql-reimb";
import {Reimb} from "../model/reimb";

export function reimbConverter(reimbursement: SqlReimb) {
    return new Reimb(reimbursement.reimb_id, reimbursement.reimb_amount, reimbursement.reimb_submitted,
        reimbursement.reimb_resolved, reimbursement.reimb_description, reimbursement.reimb_author,
        reimbursement.reimb_resolver, reimbursement.reimb_status_id, reimbursement.reimb_type_id)
}