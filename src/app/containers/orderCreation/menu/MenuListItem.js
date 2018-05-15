import React from 'react';
import { connect } from 'react-redux';

class MenuListItem extends React.Component {
    render() {
        const { menu, orderCreation, onClick } = this.props;

        const classes = orderCreation.menu.id === menu.id ? 'bg-purple-lighter' : 'hover:bg-purple-lighter';

        return (
            <div className={"text-grey-darkest w-1/4 px-4 py-4 mx-8 my-4 border rounded shadow cursor-pointer " + classes}
                 onClick={() => onClick(menu)}>
                <h3 className="mb-1 capitalize">
                    {menu.name}
                </h3>
                {/*<p className="text-center">*/}
                {/*{menu.categories.map((c) => c.name).join(', ')}*/}
                {/*</p>*/}
                <ul className="list-style-none p-2 italic text-grey-darker">
                    {menu.categories.map((c) => {
                        return <li key={c.id}> {c.name} </li>;
                    })}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state,
    };
}

export default connect(mapStateToProps)(MenuListItem);