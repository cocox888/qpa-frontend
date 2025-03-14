'use client';
import OBMCard from '@/components/card/DetailCard/obmCard';
import SMMCard from '@/components/card/DetailCard/smmCard';
import VACard from '@/components/card/DetailCard/vaCard';
import WDSCard from '@/components/card/DetailCard/wdsCard';
import SimpleCard from '@/components/card/simpleCard';
import FilterBar from '@/components/FilterBar';
import type { TypeProject, TypeTask, TypeUser } from '@/lib/types';
import ProjectDetailModal, {
  type ProjectData
} from '@/components/ClientComponent/clientProjectDetail';
import { useEffect, useState } from 'react';
import type { AppDispatch, RootState } from '@/app/admin/reducers/store';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { getAllProjects } from '@/app/client/reducers/projects';

export interface ClientProps {
  id?: number;
  full_name?: string;
}

export interface UserProps {
  id?: number;
  full_name?: string;
  position?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.0 // 200ms delay between items
      // Ensures staggered children animation starts after parent is ready
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 100 }, // Start below the final position
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } // End at the final position
};

export default function Projects() {
  const [index, setIndex] = useState(0);
  const [detailData, setDetailData] = useState<TypeProject | null>(null);
  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const projectCounts = useSelector(
    (state: RootState) => state.projects.projectCounts
  );
  const projects = useSelector((state: RootState) => state.projects.projects);

  useEffect(() => {
    const token = localStorage.getItem('refresh_token');
  }, [dispatch, index, createModal, detailModal]);

  useEffect(() => {
    dispatch(getAllProjects());
  }, [detailModal]);

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

  const closeNewProjectModal = () => {
    setCreateModal(false);
  };

  const openProjectDetails = (i: number, d?: TypeProject) => {
    setDetailData(d || null);
    setDetailModal(true);
  };

  const handleFilter = (index: number) => {
    console.log(index);
    setIndex(index);
  };

  return (
    <div className="pt-20 pl-64 pr-6 pb-20 h-screen w-screen overflow-x-hidden">
      {/* <!-- Page Header --> */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
            <p className="text-sm text-gray-500 mt-1">
              Here's the projects that you requested!
            </p>
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
        <motion.div
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {filterData().map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              {project.package_type === 'va' && (
                <VACard onClick={openProjectDetails} project={project} />
              )}
              {project.package_type === 'obm' && (
                <OBMCard onClick={openProjectDetails} project={project} />
              )}
              {project.package_type === 'smm' && (
                <SMMCard onClick={openProjectDetails} project={project} />
              )}
              {project.package_type === 'wds' && (
                <WDSCard onClick={openProjectDetails} project={project} />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
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
