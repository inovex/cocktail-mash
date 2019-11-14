import cx from 'classnames';
import * as React from 'react';

import Glass from '../Glass';
import './CocktailGlass.css';

interface CocktailGlassProps {
    fillColor: string;
    fillPercent: number;
    isMedium?: boolean;
    isSmall?: boolean;
}
class CocktailGlass extends React.PureComponent<CocktailGlassProps, {}> {
    public static defaultProps: CocktailGlassProps = {
        fillColor: 'skyblue',
        fillPercent: 50,
        isMedium: false,
        isSmall: false
    };

    public render() {
        return <>
            <div className={cx('CocktailGlass', {
                'CocktailGlass--medium': this.props.isMedium,
                'CocktailGlass--small': this.props.isSmall
            })}>
                <Glass fillColor={this.props.fillColor} fillPercent={this.props.fillPercent} />
            </div>
        </>;
    }
}

export default CocktailGlass;