import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./TelegramQR.scss";

const TelegramQR = ({ telegramToken }) => {
    const botUsername = "myspendrbot";
    const link = `https://t.me/${botUsername}?start=${telegramToken}`;

    return (
        <div className="telegram-qr-container">
            <h2>📲 Collega Telegram</h2>
            <p>Scansiona il codice o clicca per aprire direttamente il bot:</p>

            <a href={link} target="_blank" rel="noreferrer">
                <QRCodeCanvas value={link} size={200} bgColor="transparent" fgColor="#c1ff00" />
                <p className="telegram-link">{link}</p>
            </a>
        </div>
    );
};

export default TelegramQR;
