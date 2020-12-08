import React, { Component } from 'react';
import Faq from "react-faq-component";
let faq_data = {
    title: "",
    rows: [
        {
            title: "Register or Login.",
            content: "You can set up a meeting with a translator by navigating to the calender from the homepage. There you will see all the available time slots with translators that speak your language. You can simply click on the slot and enter your details to request the meeting.",
        },
        {
            title: "Make an appointment.",
            content: 'You can upload documents in the documents field on the homepage. If you have not yet done so please create an account, login and upload your documents on the homepage. We accept all popular file formats.',
        },
        {
            title: "Communicate with translator.",
            content: 'All your data is encrypted and will never be shared with anyone except the people you have elected to share with.',
        },
        {
            title: "Securely share legal documents.",
            content: 'As many as you want. We are here to help you through the entire immigration process and are happy to help as much as we can.',
        },
    ],
};

const styles = {
    bgColor: 'white',
    titleTextColor: "black",
    rowTitleColor: "dark-grey",
    rowContentColor: 'grey',
    // arrowColor: "red",
};
 
const config = {
    animate: true,
    // arrowIcon: "V",
    // tabFocus: true
};
 


export default class About extends Component {


    render() {
        let name = this.props.name;

        return (
            <div>
                <div>
                    <br></br>
                    <h4>Translation management solutions for the US Citizenship and Immigration Service (USCIS)</h4>
                    <h6></h6>
                    <div className="text-muted">
                        Native Tongue is a private entity providing services to government agencies such as the USCIS and the DHS. We are committed to streamlining immigration processes through the efficient allocation of translation services.
                        <br></br><br></br>
                        <em><u>This is a demo for purposes of marketing and beta testing.</u></em>
                        <br></br><br></br>
                        <div href="facebook.com">
                            Links to: <br></br>
                            <li>Pitch Deck</li>
                            <li>SDD</li>
                            <li>SRS</li>
                        </div>
                    </div>
                    <br></br><br></br>
                </div>
                <Faq data={faq_data} styles={styles} config={config} />
            </div>
            
        );
    }
}