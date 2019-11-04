import React, { Component } from 'react'

export class NotFound extends Component {
    render() {
        return (
            <div className="auth-wrapper offline">
                <div className="text-center">
                    <h1 className="mb-4">ERREUR 404</h1>
                    <h4 className="text-muted mb-4">Page Introuvable, </h4>
                </div>
            </div>
        )
    }
}

export default NotFound;
