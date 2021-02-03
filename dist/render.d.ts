import React from 'react';
declare type TOnReder<T> = (data: T) => React.ReactElement;
declare const Render: {
    ensure: <T>(onRender: TOnReder<T>, data?: T | undefined, onLoading?: (() => React.ReactElement) | undefined) => React.ReactElement;
};
export { Render };
