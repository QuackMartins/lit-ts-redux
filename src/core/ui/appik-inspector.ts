import {html, LitElement, property} from "lit-element";
import {Application} from "../application";
import "./appik-console";
import "./data-viewer";
import {AppikConsole} from "./appik-console";

class AppikInspector extends LitElement {

    private _app: Application;

    @property()
    set app(app: Application) {
        app.resources.subscribe(() => this.requestUpdate());
        app.router.subscribe(() => this.requestUpdate());
        this._app = app;
    }

    render() {
        //language=HTML
        const {router} = this._app;
        const resources = this.getResources();

        const routeAliases = Object.keys(router._routes);
        const resourceAliases = Object.keys(resources);

        return html`

            <style>
                * {
                    box-sizing: border-box;
                }
                
                :host {
                    font-family: Roboto, arial, sans-serif;
                    color: #444;
                    display: block;
                    background: #4d4d4d;
                    box-shadow: 0 5px 25px -5px rgba(0,0,0,.5);
                    z-index: 15000;
                    height: 100%;
                }
                
                button {
                    cursor: pointer;
                    padding: 10px;
                    border: none;
                    background: #fff;
                    border-radius: 2px;
                    box-shadow: 0 2px 2px rgba(0,0,0,.45);
                    outline: none;
                    transition: .2s
                }
                
                button:focus, button:hover {
                    background: #fff;
                }
            </style>
            
            <div style="display: flex; height: 100%">
                
                <div style="flex-grow: 1; flex-shrink: 0;color: #bbb">
                    <div style="padding: 10px">
                        <div style="margin-bottom: 5px">
                            <strong>Router</strong>
                        </div> 
                        <div>
                            ${routeAliases.map(it => html`
                                <button @click="${(() => this.inputGoTo(router._routes[it]))}" style="font-weight: ${it == this._app.router.getCurrentContext().alias ? 'bold' : 'normal'}">${it}</button>
                            `)}
                            <span>|</span>
                            <button @click="${this.inputGetCurrentContext}">getCurrentRoute</button>
                        </div>
                    </div>
                    <div style="padding: 10px">
                        <strong>
                            Resources:
                        </strong> 
                        <div>
                            ${resourceAliases.map(it => html`
                                <button @click="${() => this.inputResourceCode(it)}">${it}</button>
                            `)}
                        </div>
                    </div>
                </div>
                
                <appik-console .app="${this._app}"/>
            </div>
            
        `;
    }

    inputGoTo(path) {
        this.getConsole().code = `application.router.goTo("${path}")`
    }

    inputResourceCode(resourceName) {
        this.getConsole().code = `application.resources.get("${resourceName}")`;
    }

    inputGetCurrentContext() {
        this.getConsole().code = `application.router.getCurrentContext()`
    }

    getConsole(): AppikConsole {
        return this.renderRoot.querySelector(`appik-console`);
    }

    private getResources() {
        return this._app.resources.get();
    }
}

const openAppikInspector = (() => {
    let popup = undefined as Window;

    return function (app: Application): void {
        if (!customElements.get("appik-inspector")) {
            customElements.define("appik-inspector", AppikInspector);
        }

        const inspectorElm = document.createElement("appik-inspector") as AppikInspector;
        inspectorElm.app = app;

        if (popup) {
            popup.close();
        }

        popup = window.open(window.location.origin, 'popUpWindow', 'height=500,width=1080,left=750,top=50,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=no');
        popup.addEventListener("DOMContentLoaded", () => {
            popup.document.head.innerHTML = "";
            popup.document.body.innerHTML = "";
            popup.document.body.style.margin = "0";
            popup.document.body.parentElement.style.height = "100%";
            popup.document.body.style.height = "100%";
            popup.document.title = "Application Inspector";
            popup.document.body.appendChild(inspectorElm);
        });
    }
})();

export {openAppikInspector, AppikInspector}
