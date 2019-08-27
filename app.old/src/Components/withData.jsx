import * as React from "react";
import { Query } from "react-apollo";

function withData(DataDrivenComponent, qry) {
    return class extends React.Component {
        render() {
            return (
                <Query query={qry}>
                    {({ loading, error, data }) => {
                        if (error) {
                            return <div>{error.message}</div>;
                        } else if (loading) {
                            return <div>Loading...</div>;
                        } else {
                            return (
                                <DataDrivenComponent data={data} {...this.props} />
                            );
                        }
                    }}
                </Query>
            );
        }
    };
}

export default withData;
