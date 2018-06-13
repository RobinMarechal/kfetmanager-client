import BaseModel from '../../libs/BaseModel';
import Group from './Group';
import Order from './Order';
import { isEmailValid, isId, isNumber } from '../../libs/helpers';

export default class Customer extends BaseModel {

    static DEPARTMENTS = {
        DI: 'DI',
        DII: 'DII',
        PEIP: 'PEIP',
        DEE: 'DEE',
        DMS: 'DMS',
        DAE: 'DAE',
        OTHER: 'OTHER',
    };

    static YEARS = {
        PEIP: 'PEIP',
        THIRD: 'THIRD',
        FOURTH: 'FOURTH',
        FIFTH: 'FIFTH',
        PHD: 'PHD',
        PROFESSOR: 'PROFESSOR',
        OTHER: 'OTHER',
    };

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
        if (!customers)
            return [];

        const years = Object.values(Customer.YEARS);
        const departments = Object.values(Customer.DEPARTMENTS);

        return customers.sort((a, b) => {
            const aYear = years.indexOf(a.year);
            const bYear = years.indexOf(b.year);

            const aDep = departments.indexOf(a.department);
            const bDep = departments.indexOf(b.department);

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

        const yearList = Object.values(Customer.YEARS);
        const departmentList = Object.values(Customer.DEPARTMENTS);

        for (let i = 0; i < departmentList.length; i++) {
            const depI = {
                department: departmentList[i],
                years: {},
                nbCustomers: 0,
            };

            for (let j = 0; j < yearList.length; j++) {
                depI.years[j] = {
                    year: yearList[j],
                    customers: [],
                };
            }

            departments[i] = depI;
        }

        if (!customers) {
            return departments;
        }

        for (const c of customers) {
            const { department, year } = c;

            const _dep = departments[departmentList.indexOf(department)];
            const _years = _dep.years;
            const _year = _years[yearList.indexOf(year)];
            const _customers = _year.customers;

            _dep.nbCustomers++;
            _customers.push(c);
        }

        return departments;
    }

    isValid() {
        if (
            (this.year && !Object.values(Customer.YEARS).includes(this.year)) ||
            (this.department && !Object.values(Customer.DEPARTMENTS).includes(this.department)) ||
            (this.email && !isEmailValid(this.email)) ||
            (this.balance && !isNumber(this.balance))
        ) {
            return false;
        }

        if (isId(this.id)) {
            return true;
        }

        return this.name && this.year && this.department && this.email;
    }
}