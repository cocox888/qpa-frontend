'use client';

import api from '@/app/api/customApi';
import apiForFile from '@/app/api/customApiForFile';
import Toast from '@/components/toast';
import type { TypeProject, TypeReport } from '@/lib/types';
import { ChangeEvent, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from 'react-toastify';
import { getAllProjects } from '../../reducers/projects';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../reducers/store';

export default function Invoices() {
  return (
    <div className="pt-20 pl-64 pr-6 min-h-screen w-screen overflow-x-hidden"></div>
  );
}
