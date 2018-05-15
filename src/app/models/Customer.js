import BaseModel from '../../libs/BaseModel';
import Group from './Group';
import Order from './Order';

const yearOrder = ['PEIP', 'THIRD', 'FOURTH', 'FIFTH', 'PHD', 'PROFESSOR', 'OTHER'];
const departmentsOrder = ['DI', 'DII', 'PEIP', 'DMS', 'DEE', 'DAE', 'OTHER'];

export default class Customer extends BaseModel {

    static DEPARTMENTS = departmentsOrder;
    static YEARS = yearOrder;

    getFields() {
        return ['id', 'name', 'email', 'balance', 'year', 'department'];
    }

    getRelations() {
        return {
            groups: {
                class: Group,
                list: true,
            },
            orders: {
                class: Order,
                list: true,
            },
        };
    }

    getNamespace() {
        return 'customers';
    }

    // helpers

    /**
     * @param {array} customers
     * @return {array} the sorted array
     */
    static sortByYearDepartmentAndName(customers) {
        if(!customers)
            return [];

        return customers.sort((a, b) => {
            const aYear = yearOrder.indexOf(a.year);
            const bYear = yearOrder.indexOf(b.year);

            const aDep = departmentsOrder.indexOf(a.department);
            const bDep = departmentsOrder.indexOf(b.department);

            if (aDep !== bDep) {
                return aDep - bDep;
            }
            else if (aYear !== bYear) {
                return aYear - bYear;
            }
            else {
                return a.name.localeCompare(b.name);
            }
        });
    }

    static customersToDepartmentYearCustomerList(customers) {
        const departments = {};
        for (let i = 0; i < departmentsOrder.length; i++) {
            const depI = {
                department: departmentsOrder[i],
                years: {},
                nbCustomers: 0,
            };

            for (let j = 0; j < yearOrder.length; j++) {
                depI.years[j] = {
                    year: yearOrder[j],
                    customers: [],
                };
            }

            departments[i] = depI;
        }

        if(!customers){
            return departments;
        }

        for (const c of customers) {
            const { department, year } = c;

            const _dep = departments[departmentsOrder.indexOf(department)];
            const _years = _dep.years;
            const _year = _years[yearOrder.indexOf(year)];
            const _customers = _year.customers;

            _dep.nbCustomers++;
            _customers.push(c);
        }

        return departments;
    }
}