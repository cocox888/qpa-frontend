'use client';
import OBMCard from '@/components/card/DetailCard/obmCard';
import SMMCard from '@/components/card/DetailCard/smmCard';
import VACard from '@/components/card/DetailCard/vaCard';
import WDSCard from '@/components/card/DetailCard/wdsCard';
import SimpleCard from '@/components/card/simpleCard';
import FilterBar from '@/components/FilterBar';
import type { TypeProject, TypeTask, TypeUser } from '@/lib/types';
import ProjectCreateModal from '@/components/modal/projectCreateModal';
import ProjectDetailModal, {
  type ProjectData
} from '@/components/modal/projectDetailsModal';
import { useEffect, useState } from 'react';
import type { AppDispatch, RootState } from '@/app/admin/reducers/store';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjects } from '@/app/admin/reducers/projects';

export interface ClientProps {
  id?: number;
  full_name?: string;
}

export interface UserProps {
  id?: number;
  full_name?: string;
  position?: string;
}

export default function Projects() {
  const [index, setIndex] = useState(0);
  const [detailData, setDetailData] = useState<ProjectData | null>(null);
  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [clients, setClients] = useState<ClientProps[]>([]);
  const [users, setUsers] = useState<UserProps[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const projectCounts = useSelector(
    (state: RootState) => state.projects.projectCounts
  );
  const projects = useSelector((state: RootState) => state.projects.projects);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const fetchClients = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/admin/clients`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
          }
        }
      );
      const data = await response.json();
      console.log(data);
      const clientsArray = data.map((user: TypeUser) => {
        const temp = {
          full_name: user.full_name,
          id: user.id
        };
        return temp;
      });
      // console.log(clientsArray);
      setClients(clientsArray);
    };

    const fetchUsers = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/admin/team`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
          }
        }
      );
      const userData = await res.json();
      const userArray = userData.map((user: TypeUser) => {
        const temp = {
          full_name: user.full_name,
          position: user.position,
          id: user.id
        };
        return temp;
      });
      // console.log(userArray);
      setUsers(userArray);
    };
    fetchClients();
    fetchUsers();

    dispatch(getAllProjects());
  }, [dispatch, index, createModal]);

  const openNewProjectModal = () => {
    setCreateModal(true);
  };

  const filterData = () => {
    let result = [];
    switch (index) {
      case 0:
        result = projects;
        break;
      case 1:
        result = projects.filter(
          (item) => item.package_type === 'va' || item.package_type === 'obm'
        );
        break;
      default:
        result = projects.filter(
          (item) => item.package_type === 'wds' || item.package_type === 'smm'
        );
        break;
    }
    return result;
  };

  console.log(projects);
  console.log(projectCounts);
  const closeNewProjectModal = () => {
    setCreateModal(false);
  };

  const openProjectDetails = (i: number, d: ProjectData) => {
    setDetailData(d);
    setDetailModal(true);
  };

  const handleFilter = (index: number) => {
    console.log(index);
    setIndex(index);
  };

  return (
    <div className="pt-20 pl-64 pr-6 min-h-screen w-screen overflow-x-hidden">
      {/* <!-- Page Header --> */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your hourly and fixed-price projects
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 text-sm font-medium text-brand-500 bg-brand-50 rounded-lg hover:bg-brand-100 transition-colors">
              Import Projects
            </div>
            <button
              onClick={openNewProjectModal}
              className="flex items-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Project
            </button>
          </div>
        </div>

        {/* <!-- Package Type Stats --> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* <!-- Hourly Packages Stats --> */}
          <SimpleCard
            type={0}
            title="VA Packages"
            maxVal={projectCounts.vaPackageHour}
            usedVal={projectCounts.vaPackageUsedHour}
            count={projectCounts.vaPackageNum}
            completion={0}
          />
          <SimpleCard
            type={0}
            title="OBM Packages"
            maxVal={projectCounts.obmPackageHour}
            usedVal={projectCounts.obmPackageUsedHour}
            count={projectCounts.obmPackageNum}
            completion={0}
          />
          <SimpleCard
            type={1}
            title="SMM Packages"
            maxVal={600}
            usedVal={432}
            count={projectCounts.smmPackageNum}
            completion={projectCounts.compSmmPackageNum}
          />
          <SimpleCard
            type={1}
            title="WDS Packages"
            maxVal={600}
            usedVal={432}
            count={projectCounts.wdsPackageNum}
            completion={projectCounts.compWdsPackageNum}
          />
        </div>

        {/* <!-- Filters Bar --> */}
        <FilterBar filterEvent={handleFilter} />

        {/* <!-- Projects Grid --> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterData().map((project, index) => (
            <div key={index}>
              {project.package_type === 'va' && (
                <VACard onClick={openProjectDetails} project={project} />
              )}
              {project.package_type === 'obm' && (
                <OBMCard onClick={openProjectDetails} />
              )}
              {project.package_type === 'smm' && (
                <SMMCard onClick={openProjectDetails} />
              )}
              {project.package_type === 'wds' && (
                <WDSCard onClick={openProjectDetails} />
              )}
            </div>
          ))}
        </div>
      </div>
      {createModal ? (
        <>
          <ProjectCreateModal
            closeEvent={closeNewProjectModal}
            clients={clients}
            users={users}
          />
          <button
            id="modalOverlay"
            className="active modal-overlay fixed w-screen h-screen inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={closeNewProjectModal}
          />
        </>
      ) : (
        <></>
      )}
      {detailModal ? (
        <>
          <button
            id="projectDetailsOverlay"
            className="active modal-overlay fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setDetailModal(false)}
          />
          <ProjectDetailModal
            onClose={() => setDetailModal(false)}
            data={detailData}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
