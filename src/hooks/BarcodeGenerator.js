import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import './BarcodeGenerator.css';
import './Register';

const BarcodeGenerator = () => {
    const [registrationUrl, setRegistrationUrl] = useState('');

    useEffect(() => {
        // Assume the base URL is static, but could be set dynamically if needed
        setRegistrationUrl(`${window.location.origin}/Register`);
    }, []);  // Empty dependency array ensures this runs once on mount

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Patient Registration Barcode</h2>
            {registrationUrl && (
                <QRCode className='qr'
                    value={registrationUrl}
                    size={400}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"H"}
                />
            )}
            <p>Scan to register a patient</p>
        </div>
    );
};

export default BarcodeGenerator;
