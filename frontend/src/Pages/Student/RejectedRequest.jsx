import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Phone, MessageSquare, Users } from 'lucide-react';
import useGlobal from '../../utils/GlobalContext';
import Navbar from '../../components/Navbar';
import axiosClient from '../../utils/axiosClient';
import { Link } from 'react-router';

const RejectedRequest = () => {

    return (
        <div>
            <Navbar />
        </div>
    )
   
}
export default RejectedRequest;
