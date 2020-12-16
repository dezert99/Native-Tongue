import React, { Component } from 'react';
import Faq from "react-faq-component";
let faq_data = {
    title: "",
    rows: [
        {
            title: "Getting Started",
            content: "To get started please register your account or login to an exisiting account. Then navigate to the dashboard and you are off to the races.",
        },
        {
            title: "Make an appointment.",
            content: 'Once you are at the dashboard you are set to request a translation appointment. Do so by clicking on an open time slot, inputing the details an clicking the "Request" button.',
        },
        {
            title: "Communicate with translator.",
            content: 'Once your translator accepts your appointment you can freely communicate via the chat in the dashboard. If you have multiple meetings scheduled with multiple translators simply toggle between the chats by clicking on the respective appointment.',
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
                        <div>
                            Other Deliverables include: <br></br>
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