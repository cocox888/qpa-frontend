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

export interface ClientProps {
  id?: number;
  full_name?: string;
}

export interface UserProps {
  id?: number;
  full_name?: string;
  position?: string;
}

interface ProjectProps {
  id?: number;
}

export default function Projects() {
  const [index, setIndex] = useState(0);
  const [detailData, setDetailData] = useState<ProjectData | null>(null);
  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [vaPackageNumber, setVaPackageNumber] = useState(0);
  const [obmpakacageNumber, setObmPackageNumber] = useState(0);
  const [vaPackageHour, setVaPackageHour] = useState(0);
  const [obmpakacageHour, setObmPackageHour] = useState(0);
  const [vaPackageUsedHour, setVaPackageUsedHour] = useState(0);
  const [obmpakacageUsedHour, setObmPackageUsedHour] = useState(0);
  const [smmPackageNumber, setSmmPackageNumber] = useState(0);
  const [wdsPackageNumber, setWdsPackageNumber] = useState(0);
  const [compSmmPackageNumer, setCompSmmPackageNumer] = useState(0.0);
  const [compWdsPackageNumer, setCompWdsPackageNumer] = useState(0.0);

  console.log(projects);
  useEffect(() => {
    const token = localStorage.getItem('access_token');

    const fetchProjects = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/member/getAllProjects`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
          }
        }
      );
      const data = await response.json();
      let vapackagenum = 0;
      let obmpackagenum = 0;
      let smmpakcagenum = 0;
      let wdspackagenum = 0;
      let compsmmPackagenum = 0;
      let compwdsPackagenum = 0;
      let vapackagehour = 0;
      let vapackageusedhour = 0;
      let obmpackagehour = 0;
      let obmpackageusedhour = 0;
      const projectArray = data.map((project: TypeProject) => {
        if (project.package_type === 'va') {
          vapackagenum += 1;
          vapackagehour += project.monthly_hours || 0;
          project.projectTask?.map((task: TypeTask) => {
            vapackageusedhour += task.estimated_time || 0;
          });
        }
        if (project.package_type === 'obm') {
          obmpackagenum += 1;
          obmpackagehour += project.monthly_hours || 0;
          project?.projectTask?.map((task: TypeTask) => {
            obmpackageusedhour += task.estimated_time || 0;
          });
        }
        if (project.package_type === 'smm') {
          smmpakcagenum += 1;
          if (project.state === 'completed') {
            compsmmPackagenum += 1;
          }
        }
        if (project.package_type === 'wds') {
          wdspackagenum += 1;
          if (project.state === 'completed') {
            compwdsPackagenum += 1;
          }
        }
        const temp = {
          id: project.id,
          title: project.title,
          package_type: project.package_type,
          start_date: project.start_date,
          rate: project.rate
        };
        return temp;
      });
      // console.log(projectArray);
      setProjects(projectArray);
      setVaPackageNumber(vapackagenum);
      setObmPackageNumber(obmpackagenum);
      setSmmPackageNumber(smmpakcagenum);
      setWdsPackageNumber(wdspackagenum);
      if (smmpakcagenum !== 0)
        setCompSmmPackageNumer((compsmmPackagenum * 100) / smmpakcagenum);
      if (wdsPackageNumber !== 0)
        setCompWdsPackageNumer((compwdsPackagenum * 100) / wdspackagenum);
      setVaPackageHour(vapackagehour);
      setObmPackageHour(obmpackagehour);
      setVaPackageUsedHour(vapackageusedhour);
      setObmPackageUsedHour(obmpackageusedhour);
    };
    fetchProjects();
  }, []);

  const openNewProjectModal = () => {
    setCreateModal(true);
  };

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
            maxVal={vaPackageHour}
            usedVal={vaPackageUsedHour}
            count={vaPackageNumber}
            completion={0}
          />
          <SimpleCard
            type={0}
            title="OBM Packages"
            maxVal={obmpakacageHour}
            usedVal={obmpakacageUsedHour}
            count={obmpakacageNumber}
            completion={0}
          />
          <SimpleCard
            type={1}
            title="SMM Packages"
            maxVal={600}
            usedVal={432}
            count={smmPackageNumber}
            completion={compSmmPackageNumer}
          />
          <SimpleCard
            type={1}
            title="WDS Packages"
            maxVal={600}
            usedVal={432}
            count={wdsPackageNumber}
            completion={compWdsPackageNumer}
          />
        </div>

        {/* <!-- Filters Bar --> */}
        <FilterBar filterEvent={handleFilter} />

        {/* <!-- Projects Grid --> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {index === 0 ? (
            <>
              <VACard onClick={openProjectDetails} />
              <OBMCard onClick={openProjectDetails} />
              <SMMCard onClick={openProjectDetails} />
              <WDSCard onClick={openProjectDetails} />
            </>
          ) : index === 1 ? (
            <>
              <VACard onClick={openProjectDetails} />
              <OBMCard onClick={openProjectDetails} />
            </>
          ) : (
            <>
              <SMMCard onClick={openProjectDetails} />
              <WDSCard onClick={openProjectDetails} />
            </>
          )}
        </div>
      </div>

      {detailModal ? (
        <>
          <button
            id="projectDetailsOverlay"
            className="active modal-overlay fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setDetailModal(false)}
          ></button>
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
