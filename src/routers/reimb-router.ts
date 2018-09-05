import express from 'express';
import * as reimbDao from '../dao/reimb-dao';
import {authMiddleware} from "../security/authorization-middleware";

export const reimbRouter = express.Router(); // routers represent a subset of routes for the express application

/**
 * Find all reimbursements
 */
reimbRouter.get('', [
    authMiddleware(2),
    async(req, resp) => {
    try {
        console.log('retrieving all reimbursements');
        let reimbs = await reimbDao.findAll();
        resp.json(reimbs);
    } catch (err) {
        resp.sendStatus(500);
    }
}]);

reimbRouter.get('/:id', async(req, resp) => {
    const id = +req.params.id;
    console.log(`retrieving reimbursements by user id: ${id}`);
    try {
        let reimbs = await reimbDao.findById(id);
        if (reimbs !== undefined) {
            resp.json(reimbs);
        }
        else {
            resp.sendStatus(400);
        }
    } catch(err) {
        console.log(err);
        resp.sendStatus(500);
    }
})

/**
 * Create Movie
 */
reimbRouter.post('', [
    async (req, resp) => {
        try {
            const id = await reimbDao.createReimb(req.body);
            resp.status(201);
            resp.json(id);
        } catch (err) {
            console.log(err);
            resp.sendStatus(500);
        }
    }])

reimbRouter.post('/:id/:managerId/:decision', [
    authMiddleware(2),
    async (req, resp) => {
    const resolved = req.body.resolved;
    const id = +req.params.id;
    const managerId = +req.params.managerId;
    const decision = req.params.decision;
    try {
        if(decision === 'Accept'){
            await reimbDao.acceptReimb(resolved, id, managerId);
        }
        else {
            await reimbDao.denyReimb(resolved, id, managerId);
        }
        resp.status(201);
        resp.json();
    } catch (err) {
        console.log(err);
        resp.sendStatus(500);
    }
}])