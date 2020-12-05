import React, { Component } from 'react';
import Faq from "react-faq-component" ;
let faq_data = {
    title: "FAQ",
    rows: [
        {
            title: "How do I set up a meeting with a translator?",
            content: "You can set up a meeting with a translator by navigating to the calender from the homepage. There you will see all the available time slots with translators that speak your language. You can simply click on the slot and enter your details to request the meeting.",
        },
        {
            title: "How do I upload documents to discuss with a translator?",
            content: 'You can upload documents in the documents field on the homepage. If you have not yet done so please create an account, login and upload your documents on the homepage. We accept all popular file formats.',
        },
        {
            title: "How will my data and documents be stored?",
            content: 'All your data is encrypted and will never be shared with anyone except the people you have elected to share with.',
        },
        {
            title: "How many meetings can I set up?",
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
 


export default class frequent_questions extends Component {


    render() {
        let name = this.props.name;

        return (
            <div>
                <div>
                    <br></br>
                    <h3>For all questions relating to the immigration process, please refer to the guidance from the US Citizenship and Immigration Services (USCIS).</h3>
                    <br></br><br></br>
                    <body>
                        <div class="list-group list-group-flush">
                            <a href="https://www.uscis.gov/" class="list-group-item list-group-item-action">Website of the United States Citizenship and Immigration Services Agency</a>
                            <a href="https://egov.uscis.gov/casestatus/landing.do" class="list-group-item list-group-item-action">Check the status of immigration application, petition, or request.</a>
                            <a href="https://www.uscis.gov/forms/all-forms" class="list-group-item list-group-item-action">View and download all relevant forms.</a>
                            <a href="https://www.usa.gov/immigration-and-citizenship" class="list-group-item list-group-item-action">General guidance on US immigration policy and the processes involved.</a>
                        </div>
                    </body>
                    <br></br><br></br>
                </div>
                <Faq data={faq_data} styles={styles} config={config} />
            </div>
            
        );
    }
}